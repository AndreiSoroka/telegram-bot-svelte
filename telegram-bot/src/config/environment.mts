import dotenvFlow from "dotenv-flow";
import { z } from "zod";

dotenvFlow.config();

export const environmentSchema = z.object({
  NODE_ENV: z.union([z.literal("development"), z.literal("production")]),
  TELEGRAM_BOT_TOKEN: z.string(),
  PORT: z.string().optional(),
  PWD: z.string(),
  WEB_APP_URL: z.string().optional(),
  DATABASE_TYPE: z.union([z.literal("mysql"), z.literal("sqlite")]),
  SQLITE_PATH: z.string().optional(),
  MYSQL_HOST: z.string().optional(),
  MYSQL_PORT: z.string().optional(),
  MYSQL_USER: z.string().optional(),
  MYSQL_PASSWORD: z.string().optional(),
  MYSQL_DATABASE: z.string().optional(),
  TURN_ON_HTTP_SERVER: z.union([z.literal("yes"), z.literal("")]),
  ADMINS: z
    .string()
    .refine((value) => value.split(",").every((id) => /^\d+$/.test(id))),
});

export type Environment = z.infer<typeof environmentSchema>;

environmentSchema.parse(process.env);
