import type { Message } from "discord.js";
import ollamaResponse from "../../ollama/ollamaResponse";
import upsertUser from "../../prisma/upsertUser";
import getRandomNumber from "../../utils/getRandomNumber";
import isBotPinged from "../isBotPinged";

const handleMessageCreate = async (message: Message) => {
    if (message.author.bot) return;

    await upsertUser(message.author.id, {
        displayname: message.author.displayName,
        username: message.author.username,
        experienceIncrement: getRandomNumber(1, 5),
    });

    if (isBotPinged(message)) {
        message.reply(await ollamaResponse(message));
    }
};

export default handleMessageCreate;
