import "reflect-metadata";
import "./config/environment.mjs";
import { Bot } from "grammy";
import { appDataSource } from "./database/index.mjs";
import { modules, myCommands } from "./modules/index.mjs";
import type { BotContext } from "./config/types/BotContext.js";
import { sessionMiddleware } from "./middlewares/index.mjs";
import { initializeWebhook } from "./libs/telegram/initializeWebhook.mjs";
import { initializePolling } from "./libs/telegram/initializePolling.mjs";
import { normalizePort } from "./libs/server/normalizePort.mjs";

const bot = new Bot<BotContext>(process.env.TELEGRAM_BOT_TOKEN);

// global middlewares
bot.use(sessionMiddleware);

// modules
bot.use(modules);
// out of modules
bot.on("message", (ctx) =>
  ctx.reply(
    ["Unknown command", "Write /help to see available commands"].join("\n"),
  ),
);

// boot app
await Promise.all([
  bot.api.setMyCommands(myCommands).then(() => {
    console.log("Bot commands set");
  }),
  appDataSource.then(() => {
    console.log("Database initialized");
  }),
]).catch((error) => console.error(error));

if (process.env.WEBHOOK_BASE_URL) {
  await initializeWebhook(
    bot,
    process.env.WEBHOOK_BASE_URL,
    process.env.WEBHOOK_PATH,
    normalizePort(process.env.WEBHOOK_HTTP_SERVER_PORT),
  );
  console.log("Webhook initialized");
} else {
  await initializePolling(bot);
  console.log("Polling initialized");
}
