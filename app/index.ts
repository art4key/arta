import type { Interaction, Message } from "discord.js";
import { Client, Events, IntentsBitField } from "discord.js";
import handleInteractionCreate from "./events/handleInteractionCreate";
import handleMessageCreate from "./events/handleMessageCreate";

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on(Events.MessageCreate, async (message: Message) => {
    await handleMessageCreate(message);
});

client.on(Events.InteractionCreate, async (interaction: Interaction) => {
    await handleInteractionCreate(interaction);
});

client.login(Bun.env.DISCORD_TOKEN);

export default client;
