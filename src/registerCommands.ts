import { ApplicationCommandOptionType, REST, Routes } from "discord.js";
import printEntryMessage from "../utils/entryMessage";
import terminal from "../utils/terminal";

printEntryMessage();

type Command = {
    name: string;
    description: string;
    type?: number;
    options?: CommandOption[];
    default_member_permissions?: string | null;
    dm_permission?: boolean;
};

type CommandOption = {
    type: ApplicationCommandOptionType;
    name: string;
    description: string;
    required?: boolean;
    choices?: CommandOptionChoice[];
    autocomplete?: boolean;
};

type CommandOptionChoice = {
    name: string;
    value: string | number;
};

const commands: Command[] = [
    {
        name: "help",
        description: "Display information about Arta",
    },
    {
        name: "whoami",
        description: "Display information about your profile on discord server",
    },
];

if (
    !Bun.env.DISCORD_TOKEN ||
    !Bun.env.DISCORD_CLIENT_ID ||
    !Bun.env.DISCORD_GUILD_ID
) {
    terminal.error(
        "src/registerCommands",
        "Missing required environment variables: DISCORD_TOKEN, DISCORD_CLIENT_ID, or DISCORD_GUILD_ID",
    );
}

const rest = new REST({ version: "10" }).setToken(Bun.env.DISCORD_TOKEN!);

async function registerCommands() {
    try {
        terminal.info("src/registerCommands", "Registering / commands...");

        await rest.put(
            Routes.applicationGuildCommands(
                Bun.env.DISCORD_CLIENT_ID!,
                Bun.env.DISCORD_GUILD_ID!,
            ),
            {
                body: commands,
            },
        );

        terminal.info(
            "src/registerCommands",
            "/ commands registered successfully!",
        );
    } catch (error) {
        terminal.error("src/registerCommands", error);
    }
}

registerCommands();
