import type { BotContext } from "../../../config/types/BotContext.js";

import type { CommandContext } from "grammy";
import { SessionController } from "../../../libs/session/SessionController.mjs";

export async function handleCommandHelp(ctx: CommandContext<BotContext>) {
  if (!ctx.from) {
    return;
  }

  const sessionController = new SessionController(ctx);

  await ctx.reply(
    [
      "*Help:*",
      "– Just in case you didn't know, commands are entered starting with a slash `/`",
      "– The bot does not understand plain text, only commands",
      "",
      "Your account is a subscription to the bot administrator",
      "So, while your account exists, you may receive messages from the bot admin",
      "In /settings you can delete your account",
      ...(sessionController.isAdmin
        ? ["️❗️Use /adminhelp to see admin commands"]
        : []),
      "",
      "[GitHub Repository](https://github.com/AndreiSoroka/telegram\\-bot\\-web\\-app)",
    ].join("\n"),
    {
      parse_mode: "MarkdownV2",
    },
  );
}
