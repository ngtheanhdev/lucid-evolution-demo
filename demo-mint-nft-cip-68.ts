import { paymentCredentialOf, scriptFromNative, mintingPolicyToId, fromText, toUnit, Data, Constr } from "@lucid-evolution/lucid";
import { initLucid } from "./lucid-util";

async function mintAndSendNft(receiverAddress: string) {
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

    // Define NFT
    const policyId = mintingPolicyToId(mintingPolicy);
    const nftName = "C2VN-Thế Anh";
    const assetName = fromText(nftName);

    const referenceUnit = toUnit(policyId, assetName, 100); // CIP-68 Reference NFT
    const userUnit = toUnit(policyId, assetName, 222);      // CIP-68 User NFT

    const quantity = 100n;
    const amountToSend = 1n;
    const minAda = 2_000_000n;

    console.log("Policy ID:", policyId);
    console.log("NFT Name:", nftName);
    console.log("NFT Quantity:", quantity);
    console.log("Reference NFT Unit:", referenceUnit);
    console.log("User NFT Unit:", userUnit);

    // Metadata CIP-68
    const metadata = Data.fromJson({
        name: nftName,
        image: "ipfs://QmbsU3bTQU9a8yZuDjE2bd9LLY2cgUQZco1mGD3p3DNKR4",
        description: "Assignment 3.2 - CIP-68 NFT",
        level: 1
    });
    const version = BigInt(1);
    const cip68 = new Constr(0, [metadata, version]);
    const datum = Data.to(cip68);

    // Create and complete transaction to mint NFT
    const tx = await lucid
        .newTx()
        .mintAssets({
            [referenceUnit]: 1n,
            [userUnit]: quantity
        })
        .attach.MintingPolicy(mintingPolicy)
        // Reference NFT giữ lại, gắn datum chứa metadata
        .pay.ToAddressWithData(
            address,
            {
                kind: "inline",
                value: datum
            },
            {
                lovelace: minAda,
                [referenceUnit]: 1n
            })
        // User NFT gửi lại cho chính mình
        .pay.ToAddress(address, { [userUnit]: quantity - amountToSend })
        // User NFT gửi cho người nhận
        .pay.ToAddress(receiverAddress, { [userUnit]: amountToSend })
        .complete();

    // sign + commit
    const txSigned = await tx.sign.withWallet().complete();
    const txHash = await txSigned.submit();
    console.log("Mint NFT and send transaction submitted:", txHash);
    console.log(`Sent ${amountToSend} ${nftName} NFT to: ${receiverAddress}`);
}

const receiver = process.argv[2];
if (!receiver) {
    console.error("Please provide a receiver address as the first argument.");
    process.exit(1);
}

mintAndSendNft(receiver).catch(console.error);