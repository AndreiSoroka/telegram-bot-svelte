import type { Environment } from "./environment.mjs";

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Environment {}
  }
}
