import { Composer, Context } from "grammy";
import { start } from "./commands/start";
import { echo } from "./handlers/echo";

export const rootComposer = new Composer<Context>();

rootComposer.use(start);
rootComposer.use(echo);
