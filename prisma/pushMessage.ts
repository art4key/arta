import type { Message } from "discord.js";
import prisma from ".";
import terminal from "../utils/terminal";

async function pushMessage(message: Message, role: string, content: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { userId: message.author.id },
        });

        return prisma.message.create({
            data: {
                role: role,
                content: content,
                userId: user!.id,
            },
        });
    } catch (error) {
        terminal.error("prisma/pushMessage", error);
    }
}

export default pushMessage;
