import { Composer } from "grammy";
import type { BotContext } from "../config/types/BotContext.js";
import {
  registrationDetails,
  registrationModule,
} from "./registration/index.mjs";
import { settingsDetails, settingsModule } from "./settings/index.mjs";
import { helpDetails, helpModule } from "./help/index.mjs";
import { coubDetails, coubModule } from "./coub/index.mjs";
import { adminModule } from "./admin/index.mjs";

export const modules = new Composer<BotContext>();
modules.use(registrationModule);
modules.use(settingsModule);
modules.use(helpModule);
modules.use(coubModule);
modules.use(adminModule);

export const myCommands = [
  ...registrationDetails,
  ...settingsDetails,
  ...helpDetails,
  ...coubDetails,
];
