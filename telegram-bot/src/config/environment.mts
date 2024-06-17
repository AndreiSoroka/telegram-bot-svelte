import dotenvFlow from "dotenv-flow";
import { z } from "zod";

dotenvFlow.config();

export const environmentSchema = z.object({
  NODE_ENV: z.union([z.literal("development"), z.literal("production")]),
  TELEGRAM_BOT_TOKEN: z.string(),
  PORT: z.string().optional(),
  PWD: z.string(),
  WEB_APP_URL: z.string(),
  ADMINS: z
    .string()
    .refine((value) => value.split(",").every((id) => /^\d+$/.test(id))),
});

export type Environment = z.infer<typeof environmentSchema>;

environmentSchema.parse(process.env);
