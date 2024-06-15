import { InlineKeyboard } from "grammy";

export const commandSettings = "settings";

export const namespace = "Settings";

export const actionLinkRemove = `${namespace}:RemoveAccount`;
export const actionLinkClose = `${namespace}:actionLinkClose`;

export const settingsButtons = new InlineKeyboard()
  .text("Remove Account", actionLinkRemove)
  .text("Close", actionLinkClose);
