import "reflect-metadata";
import "./config/environment.mjs";
import { Bot } from "grammy";
import { appDataSource } from "./database/index.mjs";
import { modules, myCommands } from "./modules/index.mjs";
import type { BotContext } from "./config/types/BotContext.js";
import { sessionMiddleware } from "./middlewares/index.mjs";

const bot = new Bot<BotContext>(process.env.TELEGRAM_BOT_TOKEN);

// global middlewares
bot.use(sessionMiddleware);

// modules
bot.use(modules);

// boot app
await Promise.all([
  bot.api.setMyCommands(myCommands).then(() => {
    console.log("Bot commands set");
  }),
  appDataSource.then(() => {
    console.log("Database initialized");
  }),
]).catch((error) => console.error(error));

await bot
  .start()
  .then(() => {
    console.log("Bot started");
  })
  .catch((error) => console.error(error));
