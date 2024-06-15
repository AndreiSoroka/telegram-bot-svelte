import {
  type Context,
  session,
  MemorySessionStorage,
  enhanceStorage,
  Enhance,
  Composer,
} from "grammy";
import type { SessionData } from "../config/types/SessionData.js";
import type { BotContext } from "../config/types/BotContext.js";
import { userService } from "../database/services/userService.mjs";
import { SessionController } from "../libs/session/SessionController.mjs";

export const sessionMiddleware = new Composer<BotContext>();

function initial(): SessionData {
  return {
    isIdle: true,
    isRegistered: false,
    isAdmin: false,
  };
}

function getSessionKey(ctx: Context): string | undefined {
  return ctx.from?.id.toString() || ctx.chat?.id.toString();
}

const storage = enhanceStorage({
  storage: new MemorySessionStorage<Enhance<SessionData>>(),
  millisecondsToLive: 60_000,
});

export const sessionDefaultMiddleware = session({
  initial,
  getSessionKey,
  storage,
});

async function sessionDatabaseMiddleware(
  ctx: BotContext,
  next: () => Promise<void>,
) {
  const userId = ctx.from?.id.toString();
  if (!userId) {
    await ctx.reply("Sorry, I can't identify you");
    return;
  }

  const userSession = new SessionController(ctx);
  await userSession.init({
    userId,
    getRegisterStatus() {
      return userService.getUserById(userId).then((user) => !!user);
    },
  });

  return next();
}

sessionMiddleware.use(sessionDefaultMiddleware, sessionDatabaseMiddleware);
