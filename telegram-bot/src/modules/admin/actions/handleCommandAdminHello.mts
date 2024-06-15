import type { BotContext } from "../../../config/types/BotContext.js";

import type { CommandContext } from "grammy";
import { userService } from "../../../database/services/userService.mjs";
import { z } from "zod";
import { exampleAdminHello, templateAdminHello } from "../constants.mjs";

const userIdsSchema = z
  .string()
  .array()
  .refine(
    (ids) =>
      ids.length > 0 && ids.every((id) => parseInt(id).toString() === id),
  );

export async function handleCommandAdminHello(ctx: CommandContext<BotContext>) {
  if (!ctx.from) {
    return;
  }

  const [rawUserIds, ...messageFragments] = ctx.match.split(" ");

  // todo mode to utils
  const userIds = userIdsSchema.safeParse(rawUserIds.split(","));
  if (!userIds.success) {
    await ctx.reply(
      [
        `Invalid user IDs: ${rawUserIds}`,
        templateAdminHello,
        exampleAdminHello,
      ].join("\n"),
      { parse_mode: "Markdown" },
    );
    return;
  }

  // todo mode to utils
  const message = messageFragments.join(" ").trim();
  if (!message) {
    await ctx.reply(
      [`Message is empty!`, templateAdminHello, exampleAdminHello].join("\n"),
      { parse_mode: "Markdown" },
    );
    return;
  }

  // todo mode to utils
  const relevantUserIds = await Promise.all(
    userIds.data.map(async (id) => {
      return {
        id,
        userExist: await userService.getUserById(id),
      };
    }),
  );

  for (const { id, userExist } of relevantUserIds) {
    if (!userExist) {
      await ctx.reply(`> User with ID ${id} not found!`);
      continue;
    }

    try {
      await ctx.api.sendMessage(id, message);
    } catch (error) {
      await ctx.reply(
        `> Failed to send message to user with ID ${id}: ${error}`,
      );
      continue;
    }
    await ctx.reply(`> Message sent to user with ID ${id}`);
  }
}
