import type { BotContext } from "../../../config/types/BotContext.js";

import type { CommandContext } from "grammy";
import { registrationButtons, webAppButtons } from "../constants.mjs";

export async function handleCommandStart(ctx: CommandContext<BotContext>) {
  if (!ctx.from) {
    return;
  }
  if (ctx.session.isRegistered) {
    const firstName = ctx.from.first_name;
    await ctx.reply(`Hi ${firstName} You are already registered`, {
      reply_markup: webAppButtons,
    });
    return;
  }
  await ctx.reply(
    [
      "It looks like this is your first time. <b>Would you like to register?</b>",
      "",
      "After registration, you will be able to get messages from us.",
      "We will store your Telegram ID and name in our database.",
      "You can delete your data at any time. Because we are GDPR compliant.",
    ].join("\n"),
    {
      parse_mode: "HTML",
      reply_markup: registrationButtons,
    },
  );
}
