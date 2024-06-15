export type SessionData = {
  /** when we create a new session, the user is idle */
  isIdle: boolean;
  /** when the user is registered and in the database */
  isRegistered: boolean;
  /** when the user is an admin */
  isAdmin: boolean;
};
