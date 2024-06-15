import type { BotContext } from "../../../config/types/BotContext.js";
import type { CallbackQueryContext } from "grammy";

export async function handleCallbackCloseSettings(
  ctx: CallbackQueryContext<BotContext>,
) {
  await ctx.deleteMessage();
}
