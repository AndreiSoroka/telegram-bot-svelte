import type { NextFunction } from "grammy";
import type { BotContext } from "../config/types/BotContext.js";
import { SessionController } from "../libs/session/SessionController.mjs";

export async function onlyRegistered(ctx: BotContext, next: NextFunction) {
  const sessionController = new SessionController(ctx);
  if (sessionController.isRegistered) {
    return next();
  }
  await ctx.reply("You need to register first. Write /start to register.");
}
