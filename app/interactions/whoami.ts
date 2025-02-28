import type { ChatInputCommandInteraction } from "discord.js";
import getUser from "../../prisma/getUser";
import terminal from "../../utils/terminal";
import createEmbed from "../createEmbed";

async function interactionWhoAmI(interaction: ChatInputCommandInteraction) {
    try {
        const user = await getUser(interaction.user.id, {
            select: { experience: true, requiredExperience: true, level: true },
        });

        const { embed, files } = createEmbed({
            title: interaction.user.displayName,
            description: `**|  XP: ${user?.experience} / ${user?.requiredExperience}** \n **|  LVL: ${user?.level}**`,
            thumbnailPath: interaction.user.avatarURL()!,
        });

        await interaction.reply({
            embeds: [embed],
            files,
            flags: "Ephemeral",
        });
    } catch (error) {
        terminal.error("app/interactions/whoami", error);
    }
}

export default interactionWhoAmI;
