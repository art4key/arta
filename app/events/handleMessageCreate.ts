import type { Message } from "discord.js";
import ollama from "../../ollama";
import pkg from "../../utils/pkg";

const handleMessageCreate = async (message: Message) => {
    if (message.author.bot) return;

    if (message.content === "meow") {
        message.reply("meow");
    } else {
        const response = await ollama.generate({
            model: pkg.name,
            prompt: message.content,
            stream: false,
        });

        message.reply(response.response);
    }
};

export default handleMessageCreate;
