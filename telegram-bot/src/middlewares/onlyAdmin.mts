import type { NextFunction } from "grammy";
import type { BotContext } from "../config/types/BotContext.js";
import { SessionController } from "../libs/session/SessionController.mjs";

export async function onlyAdmin(ctx: BotContext, next: NextFunction) {
  const sessionController = new SessionController(ctx);
  if (sessionController.isAdmin) {
    return next();
  }
  await ctx.reply("You need to be an admin to use this command.");
}
