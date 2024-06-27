import { Bot, webhookCallback } from "grammy";
import type { BotContext } from "../../config/types/BotContext";
import { generateRandomString } from "../utils/generateRandomString.mjs";
import { combinePaths } from "../utils/combinePaths.mjs";
import http from "node:http";
import url from "node:url";

export async function initializePolling(bot: Bot<BotContext>) {
  bot
    .start({
      allowed_updates: ["message", "callback_query"],
      limit: 10,
      drop_pending_updates: true, // because it is just a test bot
    })
    .catch((error) => console.error(error));
}
