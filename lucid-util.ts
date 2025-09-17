import { Lucid, Blockfrost } from "@lucid-evolution/lucid";

const blockfrostApiKey = process.env.BLOCKFROST_API_KEY as string;
const seedPhrase = process.env.SEED_PHRASES as string;

export async function initLucid() {
    // Initialize Lucid with Blockfrost provider for Cardano Preview network
    const lucid = await Lucid(
        new Blockfrost("https://cardano-preview.blockfrost.io/api/v0", blockfrostApiKey),
        "Preview"
    );

    // Select wallet using mnemonic seed phrase
    lucid.selectWallet.fromSeed(seedPhrase);

    return lucid;
}