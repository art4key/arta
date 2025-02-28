import type { Message } from "discord.js";
import { Client, Events, IntentsBitField } from "discord.js";
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

client.login(Bun.env.DISCORD_TOKEN);

export default client;
