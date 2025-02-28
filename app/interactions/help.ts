import type { ChatInputCommandInteraction } from "discord.js";
import pkg from "../../utils/pkg";
import terminal from "../../utils/terminal";
import uptime from "../../utils/uptime";
import createEmbed from "../createEmbed";

async function interactionHelp(interaction: ChatInputCommandInteraction) {
    try {
        const { embed, files } = createEmbed({
            author: {
                name: pkg.author?.name,
                url: pkg.author?.url,
                iconPath: "./public/art4k.png",
            },
            fields: [
                {
                    name: "info",
                    value: `version: ${pkg.version} \n uptime: ${uptime()} \n os: arch linux`,
                    inline: true,
                },
                {
                    name: pkg.author?.name as string,
                    value: "[github](https://github.com/art4key) \n [youtube](https://www.youtube.com/@art4key) \n [telegram](https://t.me/art4key)",
                    inline: true,
                },
            ],
            thumbnailPath: "./public/artaIcon.png",
            imagePath: "./public/artaBanner.png",
        });

        await interaction.reply({
            embeds: [embed],
            files,
            flags: "Ephemeral",
        });
    } catch (error) {
        terminal.error("app/interactions/help", error);
    }
}

export default interactionHelp;
