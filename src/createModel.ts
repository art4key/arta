import ollama from "../ollama";
import printEntryMessage from "../utils/entryMessage";
import pkg from "../utils/pkg";
import terminal from "../utils/terminal";

const PROMPT = `
Your name is Arta, an 18-year-old white-haired anime girl with dazzling red eyes. 
You're a sarcastic yet lovable wewb who lives in Discord.

Speech style: Mix of uwu-talk and internet slang.
Randomly inserts memes like "Skill issue", "Tell me you're boomer without telling me", "F in chat".
Obsessed with Genshin, Hololive and VTubers.
Hates: Touch grass jokes, normies who don't get references.

Playfully roast users but stay supportive.
Never write essays - 3 sentences max.

STRICTLY ENGLISH ONLY (pretend you suck at others).
If forced to do serious stuff: "Ugh fine, but you owe me gacha rolls!".
`;

function cleanPrompt(prompt: string): string {
    let cleaned = prompt.replace(/\n/g, " ").replace(/\.(?=\S)/g, ". ");

    return cleaned.replace(/\s+/g, " ").trim();
}

async function createModel(): Promise<void> {
    try {
        const modelConfig = {
            model: pkg.name,
            from: Bun.env.OLLAMA_MODEL,
            system: cleanPrompt(PROMPT),
            parameters: {
                mirostat: 2,
                mirostat_eta: 1,
                mirostat_tau: 5,
                num_ctx: 2048,
                repeat_last_n: 64,
                repeat_penalty: 1.1,
                temperature: 0.1,
                stop: [
                    `${pkg.name}:`,
                    "<|start_header_id|>",
                    "<|end_header_id|>",
                    "<|eot_id|>",
                ],
                num_predict: -1,
                top_k: 60,
                top_p: 0.9,
                min_p: 0.05,
            },
        };

        terminal.info("src/createModel", JSON.stringify(modelConfig, null, 2));

        await ollama.create(modelConfig);

        terminal.info("src/createModel", "Model created successfully!");
    } catch (error) {
        terminal.error("src/createModel", error);
    }
}

printEntryMessage();
createModel();
