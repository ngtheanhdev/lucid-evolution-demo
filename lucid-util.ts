import { Lucid, Blockfrost, Data, Constr, toText } from "@lucid-evolution/lucid";

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

export function decodeDatum(datum: string) {
    const constr = Data.from(datum) as Constr<Data>;
    const metadataMap = constr.fields[0] as Map<string, any>;
    const version = constr.fields[1].toString();

    const decoded: Record<string, any> = {};
    for (const [k, v] of metadataMap.entries()) {
        const key = toText(k);   // key là hex → string
        let value: any;

        if (typeof v === "bigint") {
            value = v.toString();
        } else if (typeof v === "string") {
            // string có thể là hex (text) hoặc raw string
            try {
                value = toText(v); // thử convert hex → text
            } catch {
                value = v;
            }
        } else {
            value = v;
        }
        decoded[key] = value;
    }

    return { metadata: decoded, version };
}