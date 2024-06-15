import type { BotContext } from "../../../config/types/BotContext.js";

import type { CommandContext } from "grammy";
import { settingsButtons } from "../constants.mjs";

export async function handleCommandSettings(ctx: CommandContext<BotContext>) {
  if (!ctx.from) {
    return;
  }

  await ctx.reply("Settings:", {
    parse_mode: "HTML",
    reply_markup: settingsButtons,
  });
}
