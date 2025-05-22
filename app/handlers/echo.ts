import { Composer, Context } from "grammy";

export const echo = new Composer<Context>();

echo.on("message:text", async (context) => {
    await context.reply(`echo: ${context.message.text}`);
});
