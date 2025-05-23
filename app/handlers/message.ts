import { Composer, Context } from "grammy";
import type { GenerateResponse } from "ollama";
import ollama from "../../ollama";

export const message = new Composer<Context>();

message.on("message:text", async (context) => {
    const response: GenerateResponse = await ollama.generate({
        model: "qwen3:14b",
        prompt: context.message.text,
        stream: false,
    });

    await context.reply(response.response);
});
