import type { Interaction } from "discord.js";
import interactionHelp from "../interactions/help";

const handleInteractionCreate = async (interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "help") {
        interactionHelp(interaction);
    }
};

export default handleInteractionCreate;
