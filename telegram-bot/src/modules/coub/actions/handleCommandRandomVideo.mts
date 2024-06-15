import type { BotContext } from "../../../config/types/BotContext.js";

import type { CommandContext } from "grammy";
import { z } from "zod";

const responseSchema = z.object({
  coubs: z
    .object({
      title: z.string(),
      permalink: z.string(),
    })
    .array(),
});

export async function handleCommandRandomVideo(
  ctx: CommandContext<BotContext>,
) {
  if (!ctx.from) {
    return;
  }

  const response = await fetch(
    "https://coub.com/api/v2/timeline/explore/random",
  )
    .then((res) => res.json())
    .then((data) => responseSchema.parse(data));

  const coub = response.coubs[0];

  await ctx.reply(
    [
      `Title: ${coub.title}`,
      `Link: https://coub.com/view/${coub.permalink}`,
    ].join("\n"),
  );
}
