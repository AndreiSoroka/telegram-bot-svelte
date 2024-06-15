import type { Context, SessionFlavor } from "grammy";
import type { SessionData } from "./SessionData";

export type BotContext = Context & SessionFlavor<SessionData>;
