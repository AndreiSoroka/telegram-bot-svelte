import { Composer } from "grammy";
import { commandHelp } from "./constants.mjs";
import { BotContext } from "../../config/types/BotContext.js";
import { handleCommandHelp } from "./actions/handleCommandHelp.mjs";
import { BotCommand } from "grammy/types";
import { onlyRegistered } from "../../middlewares/index.mjs";

export const helpModule = new Composer<BotContext>();
export const helpDetails: BotCommand[] = [
  { command: commandHelp, description: "Show help" },
];

helpModule.command(commandHelp, onlyRegistered, handleCommandHelp);
