import prisma from ".";

async function getUserMessages(userId: string) {
    const messages = await prisma.user.findUnique({
        where: { userId },
        include: { messages: true },
    });

    return messages;
}

export default getUserMessages;
