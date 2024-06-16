import { InlineKeyboard } from "grammy";

export const commandStart = "start";

export const namespace = "Registration";

export const actionLinkYes = `${namespace}:Yes`;
export const actionLinkNo = `${namespace}:No`;

export const registrationButtons = new InlineKeyboard()
  .text("Yes", actionLinkYes)
  .text("No", actionLinkNo);

export const webAppButtons = new InlineKeyboard().webApp(
  "Open web app",
  process.env.WEB_APP_URL,
);
