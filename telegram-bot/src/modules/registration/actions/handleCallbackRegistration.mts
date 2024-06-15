import type { BotContext } from "../../../config/types/BotContext.js";
import type { CallbackQueryContext } from "grammy";
import { userService } from "../../../database/services/userService.mjs";
import { SessionController } from "../../../libs/session/SessionController.mjs";
import { webAppButtons } from "../constants.mjs";

export async function handleCallbackRegistration(
  ctx: CallbackQueryContext<BotContext>,
) {
  await ctx.editMessageText("Moment...");

  await userService.addUser(ctx.from.id.toString(), ctx.from.first_name);
  const sessionController = new SessionController(ctx);
  sessionController.setRegistered(true);

  await ctx.deleteMessage();

  await ctx.reply(
    [
      "Perfect! Now you are registered.",
      "Write /help for get more details",
    ].join("\n"),
    {
      reply_markup: webAppButtons,
    },
  );
}
