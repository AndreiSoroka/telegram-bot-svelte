import { Composer } from "grammy";
import {
  commandAdminHello,
  commandAdminUserList,
  commandAdminHelp,
} from "./constants.mjs";
import { BotContext } from "../../config/types/BotContext.js";
import { onlyAdmin, onlyRegistered } from "../../middlewares/index.mjs";
import { handleCommandUserList } from "./actions/handleCommandUserList.mjs";
import { handleCommandAdminHello } from "./actions/handleCommandAdminHello.mjs";
import { handleCommandAdminHelp } from "./actions/handleCommandAdminHelp.mjs";

export const adminModule = new Composer<BotContext>();

adminModule.command(
  commandAdminHello,
  onlyRegistered,
  onlyAdmin,
  handleCommandAdminHello,
);

adminModule.command(
  commandAdminUserList,
  onlyRegistered,
  onlyAdmin,
  handleCommandUserList,
);

adminModule.command(
  commandAdminHelp,
  onlyRegistered,
  onlyAdmin,
  handleCommandAdminHelp,
);
