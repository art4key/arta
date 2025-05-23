import { Composer, Context } from "grammy";
import { start } from "./commands/start";
import { message } from "./handlers/message";

export const rootComposer = new Composer<Context>();

rootComposer.use(start);
rootComposer.use(message);
