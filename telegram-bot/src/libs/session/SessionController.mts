import type { BotContext } from "../../config/types/BotContext.js";

const adminIds = process.env.ADMINS.split(",");

export class SessionController {
  private readonly _ctx: BotContext;

  constructor(ctx: BotContext) {
    this._ctx = ctx;
  }

  public async init(payload: {
    userId: string;
    getRegisterStatus: () => Promise<boolean>;
  }) {
    const { session } = this._ctx;
    if (!session.isIdle) {
      return;
    }

    session.isRegistered = await payload.getRegisterStatus();
    session.isAdmin = adminIds.includes(payload.userId);

    session.isIdle = false;
  }

  public get isRegistered() {
    return this._ctx.session.isRegistered;
  }

  public setRegistered(value: boolean) {
    this._ctx.session.isRegistered = value;
  }

  public get isAdmin() {
    return this._ctx.session.isAdmin;
  }
}
