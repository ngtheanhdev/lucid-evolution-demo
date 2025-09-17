import {
    SpendingValidator,
    Data,
    Constr,
    paymentCredentialOf,
    validatorToAddress,
} from "@lucid-evolution/lucid";
import { initLucid } from "./lucid-util";

const cborHex = process.env.ASSIGNMENT_2_SCRIPT_CBORHEX as string;

async function lockAsset() {
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

    const lovelaceToLock = 2000003n;

    // Create and complete transaction to lock assets with datum
    const tx = await lucid
        .newTx()
        .pay.ToContract(
            scriptAddress,
            { kind: "inline", value: Data.to(new Constr(0, [publicKeyHash])) },
            { lovelace: lovelaceToLock }
        )
        .complete();

    // sign + commit
    const signed = await tx.sign.withWallet().complete();
    const txHash = await signed.submit();
    console.log("Transaction created:", txHash);
}

lockAsset().catch(console.error);