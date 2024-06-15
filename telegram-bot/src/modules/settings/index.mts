import { Composer } from "grammy";
import {
  actionLinkRemove,
  actionLinkClose,
  commandSettings,
} from "./constants.mjs";
import { BotContext } from "../../config/types/BotContext.js";
import { handleCallbackCloseSettings } from "./actions/handleCallbackCloseSettings.mjs";
import { handleCallbackRemoveAccount } from "./actions/handleCallbackRemoveAccount.mjs";
import { handleCommandSettings } from "./actions/handleCommandSettings.mjs";
import { BotCommand } from "grammy/types";
import { onlyRegistered } from "../../middlewares/index.mjs";

export const settingsModule = new Composer<BotContext>();
export const settingsDetails: BotCommand[] = [
  { command: commandSettings, description: "Show settings" },
];

settingsModule.command(commandSettings, onlyRegistered, handleCommandSettings);
settingsModule.callbackQuery(actionLinkRemove, handleCallbackRemoveAccount);
settingsModule.callbackQuery(actionLinkClose, handleCallbackCloseSettings);
