import type { BotContext } from "../../../config/types/BotContext.js";
import type { CallbackQueryContext } from "grammy";

export async function handleCallbackCancelRegistration(
  ctx: CallbackQueryContext<BotContext>,
) {
  await ctx.editMessageText(
    "Okay, maybe next time\nWrite /start to register if you change your mind",
  );
}
