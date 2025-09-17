import { paymentCredentialOf, scriptFromNative, mintingPolicyToId, fromText, toUnit } from "@lucid-evolution/lucid";
import { initLucid } from "./lucid-util";

async function mintAndSendToken(receiverAddress: string) {
    const lucid = await initLucid();
    const address = await lucid.wallet().address();
    const publicKeyHash = paymentCredentialOf(address).hash;
    console.log("Address:", address);
    console.log("Public key hash:", publicKeyHash);

    // Minting policy
    const mintingPolicy = scriptFromNative({
        type: "all",
        scripts: [
            { type: "sig", keyHash: publicKeyHash }
        ],
    });

    // Define token and amount to mint and send
    const policyId = mintingPolicyToId(mintingPolicy);
    const tokenName = "Assignment 3.1 - Thế Anh";
    const assetName = fromText(tokenName);
    const unit = toUnit(policyId, assetName);
    const quantity = 5000n;
    const amountToSend = 500n;
    console.log("Policy ID:", policyId);
    console.log("Asset ID:", unit);

    // Create and complete transaction to mint and send token
    const tx = await lucid
        .newTx()
        .mintAssets({ [unit]: quantity })
        .attach.MintingPolicy(mintingPolicy)
        .pay.ToAddress(receiverAddress, { [unit]: amountToSend })
        .complete();

    // sign + commit
    const txSigned = await tx.sign.withWallet().complete();
    const txHash = await txSigned.submit();
    console.log("Mint + Send transaction submitted:", txHash);
    console.log(`Sent ${amountToSend} ${tokenName} tokens to: ${receiverAddress}`);
}

const receiver = process.argv[2];
if (!receiver) {
    console.error("Please provide a receiver address as the first argument.");
    process.exit(1);
}

mintAndSendToken(receiver).catch(console.error);