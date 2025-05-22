import { Composer, Context } from "grammy";

export const start = new Composer<Context>();

start.command("start", async (context) => {
    await context.reply("meow");
});
