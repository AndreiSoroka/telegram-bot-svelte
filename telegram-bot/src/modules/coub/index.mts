import { Composer } from "grammy";
import { commandCoub } from "./constants.mjs";
import { BotContext } from "../../config/types/BotContext.js";
import { handleCommandRandomVideo } from "./actions/handleCommandRandomVideo.mjs";
import { BotCommand } from "grammy/types";
import { onlyRegistered } from "../../middlewares/index.mjs";

export const coubModule = new Composer<BotContext>();
export const coubDetails: BotCommand[] = [
  { command: commandCoub, description: "Get random short video from coub.com" },
];

coubModule.command(commandCoub, onlyRegistered, handleCommandRandomVideo);
