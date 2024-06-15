import type { BotContext } from "../../../config/types/BotContext.js";
import type { CallbackQueryContext } from "grammy";
import { userService } from "../../../database/services/userService.mjs";
import { SessionController } from "../../../libs/session/SessionController.mjs";

export async function handleCallbackRemoveAccount(
  ctx: CallbackQueryContext<BotContext>,
) {
  await ctx.editMessageText("Moment...");

  await userService.removeUserById(ctx.from.id.toString());
  const sessionController = new SessionController(ctx);
  sessionController.setRegistered(false);

  await ctx.deleteMessage();

  await ctx.reply(
    [
      "Your account has been removed.",
      "You can register again by writing /start",
    ].join("\n"),
  );
}
