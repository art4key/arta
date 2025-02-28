import type { Message } from "discord.js";

const botNames = ["арта", "arta"];
const botRegex = new RegExp(
    `(?<!\\p{L})@?(?:${botNames.join("|")})(?!\\p{L})`,
    "iu",
);

export const isBotPinged = (message: Message): boolean => {
    const { client, mentions, content } = message;
    const botUser = client.user;

    if (mentions.everyone || mentions.has("here")) return true;

    if (botUser && mentions.users.has(botUser.id)) return true;

    if (
        mentions.roles.some((role) =>
            botNames.includes(role.name.toLowerCase()),
        )
    )
        return true;

    return botRegex.test(content);
};

export const cleanMessagePing = (message: Message): string => {
    let cleanedContent = message.content;
    const { client } = message;
    const botUser = client.user;

    if (botUser) {
        const userMention = `<@${botUser.id}>`;
        cleanedContent = cleanedContent.replace(
            new RegExp(userMention, "gi"),
            "",
        );
    }

    message.mentions.roles.forEach((role) => {
        if (botNames.includes(role.name.toLowerCase())) {
            const roleMention = `<@&${role.id}>`;
            cleanedContent = cleanedContent.replace(
                new RegExp(roleMention, "g"),
                "",
            );
        }
    });

    cleanedContent = cleanedContent
        .replace(/@everyone/gi, "")
        .replace(/@here/gi, "");

    cleanedContent = cleanedContent.replace(botRegex, "");

    return cleanedContent.trim();
};

export default isBotPinged;
