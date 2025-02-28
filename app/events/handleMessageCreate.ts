import type { Message } from "discord.js";
import ollama from "../../ollama";
import upsertUser from "../../prisma/upsertUser";
import getRandomNumber from "../../utils/getRandomNumber";
import pkg from "../../utils/pkg";

const handleMessageCreate = async (message: Message) => {
    if (message.author.bot) return;

    await upsertUser(message.author.id, {
        displayname: message.author.displayName,
        username: message.author.username,
        experienceIncrement: getRandomNumber(1, 5),
    });

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
