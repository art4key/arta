import type { Interaction } from "discord.js";
import upsertUser from "../../prisma/upsertUser";
import interactionHelp from "../interactions/help";
import interactionWhoAmI from "../interactions/whoami";

const handleInteractionCreate = async (interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) return;

    await upsertUser(interaction.user.id, {
        displayname: interaction.user.displayName,
        username: interaction.user.username,
    });

    if (interaction.commandName === "help") {
        interactionHelp(interaction);
    }

    if (interaction.commandName === "whoami") {
        interactionWhoAmI(interaction);
    }
};

export default handleInteractionCreate;
