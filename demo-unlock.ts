import {
  SpendingValidator,
  Data,
  Constr,
  paymentCredentialOf,
  validatorToAddress,
  fromText,
} from "@lucid-evolution/lucid";
import { initLucid } from "./lucid-util";

const cborHex = process.env.ASSIGNMENT_2_SCRIPT_CBORHEX as string;

async function unlockAsset() {
  const lucid = await initLucid();
  const address = await lucid.wallet().address();
  const publicKeyHash = paymentCredentialOf(address).hash;
  console.log("Address:", address);
  console.log("Public key hash:", publicKeyHash);

  // Define PlutusV2 smart contract (spending validator) in hex format
  const script: SpendingValidator = {
    type: "PlutusV2",
    script: cborHex
  };
  const scriptAddress = validatorToAddress("Preview", script);
  console.log("Smart contract address: ", scriptAddress);

  // Fetch all UTxOs at the contract address
  const scriptUTxOs = await lucid.utxosAt(scriptAddress);
  // Filter UTxOs has datum contain public key hash
  const utxosUnlock = scriptUTxOs.filter((utxo) => {
    let datum = Data.from<Constr<string>>(utxo.datum ?? '');
    if (datum && (datum.fields[0] === publicKeyHash)) {
      return utxo;
    }
  });
  console.log("UTxOs to unlock: ", utxosUnlock);

  // Create and complete transaction to unlock assets with datum
  const tx = await lucid
    .newTx()
    .addSigner(address)
    .attach.SpendingValidator(script)
    .collectFrom(utxosUnlock, Data.to(new Constr(0, [fromText("Hello world!")])))
    .complete();

  // sign + commit
  const txSigned = await tx.sign.withWallet().complete();
  const txHash = await txSigned.submit();
  console.log("Transaction created:", txHash);
}

unlockAsset().catch(console.error);