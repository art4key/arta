import { bot } from "../app";
import { printEntryMessage } from "../utils/utils";

printEntryMessage();

bot.start({
    onStart: (info) =>
        console.log(`Bot started as https://t.me/${info.username}`),
}).catch(console.error);
