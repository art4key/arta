import client from "../../app";

async function addRoleToUser(args: { user: string; role: string }) {
    const guildId: string = Bun.env.DISCORD_GUILD_ID!;

    const guild = client.guilds.cache.get(guildId);

    if (!guild) {
        return "discord guild is unknown";
    }

    const member = guild.members.cache.find(
        (m) => m.id === args.user || m.user.username === args.user,
    );

    if (!member) {
        return "This user not found on this discord server";
    }

    const role = guild.roles.cache.find(
        (r) => r.id === args.role || r.name === args.role,
    );

    if (!role) {
        return "This role not found on this discord server";
    }

    try {
        await member.roles.add(role.id);

        return `role ${role.name} added to ${member.user.username}.`;
    } catch (error) {
        return "nothing to do in this function";
    }
}

export default addRoleToUser;
