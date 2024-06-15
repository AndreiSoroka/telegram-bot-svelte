import { Composer } from "grammy";
import { actionLinkNo, actionLinkYes, commandStart } from "./constants.mjs";
import { BotContext } from "../../config/types/BotContext.js";
import { handleCallbackCancelRegistration } from "./actions/handleCallbackCancelRegistration.mjs";
import { handleCallbackRegistration } from "./actions/handleCallbackRegistration.mjs";
import { handleCommandStart } from "./actions/handleCommandStart.mjs";
import { BotCommand } from "grammy/types";

export const registrationModule = new Composer<BotContext>();
export const registrationDetails: BotCommand[] = [
  { command: commandStart, description: "Start registration for new members" },
];

registrationModule.command(commandStart, handleCommandStart);
registrationModule.callbackQuery(actionLinkYes, handleCallbackRegistration);
registrationModule.callbackQuery(
  actionLinkNo,
  handleCallbackCancelRegistration,
);
