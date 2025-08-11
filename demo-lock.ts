import {
    Lucid,
    Blockfrost,
    SpendingValidator,
    Data,
    Constr,
    paymentCredentialOf,
    validatorToAddress,
} from "@lucid-evolution/lucid";

// Initialize environment variables
const blockfrostApiKey = process.env.BLOCKFROST_API_KEY as string;
const seedPhrase = process.env.SEED_PHRASES as string;
const cborHex = process.env.ASSIGNMENT_2_SCRIPT_CBORHEX as string;

async function lockAsset() {
    // Initialize Lucid with Blockfrost provider for Cardano Preview network
    const lucid = await Lucid(
        new Blockfrost("https://cardano-preview.blockfrost.io/api/v0", blockfrostApiKey),
        "Preview"
    );

    // Select wallet using mnemonic seed phrase
    lucid.selectWallet.fromSeed(seedPhrase);
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