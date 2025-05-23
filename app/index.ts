import { Bot } from "grammy";
import { rootComposer } from "./composer";

export const bot = new Bot(process.env.BOT_TOKEN as string);

bot.use(rootComposer.middleware());
