import type { BotContext } from "../../../config/types/BotContext.js";

import type { CommandContext } from "grammy";
import { userService } from "../../../database/services/userService.mjs";

export async function handleCommandUserList(ctx: CommandContext<BotContext>) {
  if (!ctx.from) {
    return;
  }

  const searchString = ctx.match;

  await userService.getUsersStream(async (users) => {
    if (!users.length) {
      await ctx.reply("No users found");
      return;
    }
    await ctx.reply(
      users
        .map(
          (user) =>
            `\`${user.telegramID}\` ${user.firstName} \\[${user.createdAt.toJSON().slice(0, 10)}]`,
        )
        .join("\n"),
      {
        parse_mode: "Markdown",
      },
    );
  }, searchString);
}
