import type { Message } from "discord.js";
import getUserMessages from "./getUserMessages";

async function getUserConversation(message: Message) {
    const userWithMessages = await getUserMessages(message.author.id);

    const conversation =
        userWithMessages?.messages.map((msg) => ({
            role: msg.role,
            content: msg.content,
        })) || [];

    return conversation;
}

export default getUserConversation;
