import type { Message } from "discord.js";

const handleMessageCreate = async (message: Message) => {
    if (message.author.bot) return;

    if (message.content === "meow") {
        message.reply("meow");
    }
};

export default handleMessageCreate;
