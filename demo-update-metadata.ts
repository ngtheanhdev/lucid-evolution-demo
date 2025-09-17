import { paymentCredentialOf, Data, Constr, toText } from "@lucid-evolution/lucid";
import { initLucid, decodeDatum } from "./lucid-util";

async function updateNft(referenceUnit: string) {
    const lucid = await initLucid();
    const address = await lucid.wallet().address();
    const publicKeyHash = paymentCredentialOf(address).hash;
    console.log("Address:", address);
    console.log("Public key hash:", publicKeyHash);

    // 1. Lấy UTxO chứa Reference NFT
    const utxo = await lucid.utxoByUnit(referenceUnit);
    if (!utxo) throw new Error("Reference NFT not found in wallet!");
    if (!utxo.datum) throw new Error("Reference NFT has no datum!");
    const oldDatumDecoded = decodeDatum(utxo.datum);
    console.log("Found reference UTxO:", utxo);
    console.log("Fields in datum:", oldDatumDecoded);

    // 2. Update metadata
    var oldMetadata = oldDatumDecoded.metadata;
    var oldVersion = oldDatumDecoded.version;
    const newMetadata = { ...oldMetadata, level: (BigInt(oldMetadata.level) || 0n) + 1n }   // tăng level lên 1
    const version = BigInt(oldVersion) + 1n; // tăng version lên 1
    const newDatum = Data.to(new Constr(0, [Data.fromJson(newMetadata), version]));
    console.log("New fields in datum:", decodeDatum(newDatum));

    // 3. Build tx: consume + recreate UTxO
    const tx = await lucid
        .newTx()
        .collectFrom([utxo]) // consume old reference utxo
        .pay.ToAddressWithData(
            address,
            { kind: "inline", value: newDatum },
            { [referenceUnit]: 1n }
        )
        .complete();

    // 4. Sign & submit
    const signed = await tx.sign.withWallet().complete();
    const txHash = await signed.submit();
    console.log("Update metadata transaction submitted:", txHash);
    
    // 5. Kiểm tra lại kết quả
    console.log("Waiting for transaction to be confirmed...");
    await lucid.awaitTx(txHash);
    console.log("Transaction confirmed!");
    console.log("Checking updated reference UTxO...");
    const utxoNew = await lucid.utxoByUnit(referenceUnit);
    if (!utxoNew) throw new Error("Reference NFT not found in wallet!");
    if (!utxoNew.datum) throw new Error("Reference NFT has no datum!");
    const datumDecoded = decodeDatum(utxoNew.datum);
    console.log("Found reference UTxO:", utxoNew);
    console.log("Fields in datum:", datumDecoded);
}

const referenceUnit = process.argv[2]; // policyId + label + assetName
if (!referenceUnit) {
    console.error("Please provide a reference unit as the first argument.");
    process.exit(1);
}

updateNft(referenceUnit).catch(console.error);