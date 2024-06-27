import { Bot, webhookCallback } from "grammy";
import type { BotContext } from "../../config/types/BotContext.js";
import { generateRandomString } from "../utils/generateRandomString.mjs";
import { combinePaths } from "../utils/combinePaths.mjs";
import http from "node:http";
import url from "node:url";

export async function initializeWebhook(
  bot: Bot<BotContext>,
  webhookBaseUrl: string,
  webhookPath = "",
  port = 80,
) {
  const hiddenPath = generateRandomString(12);
  const webhookFullPath = combinePaths(webhookPath, hiddenPath);

  const app = http.createServer((req, res) => {
    const parsedUrl = req.url ? url.parse(req.url, true) : null;

    if (parsedUrl?.pathname === webhookFullPath) {
      return webhookCallback(bot, "http")(req, res);
    }

    res.writeHead(200);
    res.end("Telegram bot is running!");
  });

  app.listen(port);

  const webhookUrl = combinePaths(webhookBaseUrl, webhookFullPath);
  if (process.env.NODE_ENV === "development") {
    console.log(`Webhook URL: ${webhookUrl}`);
  }

  await bot.api.setWebhook(webhookUrl);
}
