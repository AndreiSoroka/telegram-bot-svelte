import { InlineKeyboard } from "grammy";

export const commandStart = "start";

export const namespace = "Registration";

export const actionLinkYes = `${namespace}:Yes`;
export const actionLinkNo = `${namespace}:No`;

export const registrationButtons = new InlineKeyboard()
  .text("Yes", actionLinkYes)
  .text("No", actionLinkNo);

/**
 * @todo: Add web app link
 */
export const webAppButtons = new InlineKeyboard().webApp(
  "Open web app",
  "https://revenkroz.github.io/telegram-web-app-bot-example/index.html",
);
