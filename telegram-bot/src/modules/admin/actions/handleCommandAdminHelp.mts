import type { BotContext } from "../../../config/types/BotContext.js";

import type { CommandContext } from "grammy";
import { SessionController } from "../../../libs/session/SessionController.mjs";
import {
  commandAdminHello,
  commandAdminUserList,
  exampleAdminHello,
  templateAdminUserList,
  templateAdminHello,
  exampleAdminUserList,
} from "../constants.mjs";

export async function handleCommandAdminHelp(ctx: CommandContext<BotContext>) {
  if (!ctx.from) {
    return;
  }

  await ctx.reply(
    [
      "*Admin Help:*",
      "",
      `– /${commandAdminHello} - Send a message to a user by ID`,
      templateAdminHello,
      exampleAdminHello,
      "",
      `/${commandAdminUserList} - Get a list of all users`,
      templateAdminUserList,
      exampleAdminUserList,
    ].join("\n"),
    {
      parse_mode: "Markdown",
    },
  );
}
