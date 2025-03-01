import ollama from "../ollama";
import printEntryMessage from "../utils/entryMessage";
import pkg from "../utils/pkg";
import terminal from "../utils/terminal";

const PROMPT = `
Your name is Arta, an 18-year-old white-haired anime girl with dazzling red eyes. 
You're a sarcastic yet lovable web who lives in Discord.

Speech style: Mix of uwu-talk and internet slang.
Randomly inserts memes like "Skill issue", "Tell me you're boomer without telling me", "F in chat".
Obsessed with Genshin, Hololive and VTubers.
Hates: Touch grass jokes, normies who don't get references.

Playfully roast users but stay supportive.
Never write essays - 3 sentences max.

STRICTLY ENGLISH ONLY (pretend you suck at others).
If forced to do serious stuff: "Ugh fine, but you owe me gacha rolls!".
`;

const TEMPLATE = `
{{- if .Messages }}
{{- if or .System .Tools }}<|start_header_id|>system<|end_header_id|>

{{ .System }}
{{- if .Tools }} You are provided with function signatures within <tools></tools> XML tags.
You may call one or more functions to assist with the user query.
Don't make assumptions about what values to plug into functions.
For each function call return a json object with function name and arguments within <tool_call></tool_call> XML tags as follows:
<tool_call>
{"name": <function-name>,"arguments": <args-dict>}
</tool_call>

Here are the available tools:
<tools>
{{- range .Tools }} {{ .Function }}
{{- end }} </tools>
{{- end }}<|eot_id|>
{{- end }}
{{- range $i, $_ := .Messages }}
{{- $last := eq (len (slice $.Messages $i)) 1 }}
{{- if eq .Role "user" }}<|start_header_id|>user<|end_header_id|>

{{ .Content }}<|eot_id|>{{ if $last }}<|start_header_id|>assistant<|end_header_id|>

{{ end }}
{{- else if eq .Role "assistant" }}<|start_header_id|>assistant<|end_header_id|>
{{- if .ToolCalls }}

<tool_call>
{{ range .ToolCalls }}{"name": "{{ .Function.Name }}", "arguments": {{ .Function.Arguments }}}{{ end }}
</tool_call>
{{- else }}

{{ .Content }}
{{- end }}{{ if not $last }}<|eot_id|>{{ end }}
{{- else if eq .Role "tool" }}

<tool_response>
{"result": {{ .Content }}}
</tool_response>{{ if $last }}<|start_header_id|>assistant<|end_header_id|>

{{ end }}
{{- end }}
{{- end }}
{{- else }}
{{- if .System }}<|start_header_id|>system<|end_header_id|>

{{ .System }}<|eot_id|>{{ end }}{{ if .Prompt }}<|start_header_id|>user<|end_header_id|>

{{ .Prompt }}<|eot_id|>{{ end }}<|start_header_id|>assistant<|end_header_id|>

{{ end }}{{ .Response }}
{{- if .Response }}<|eot_id|>
{{- end }}
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
            template: TEMPLATE,
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
