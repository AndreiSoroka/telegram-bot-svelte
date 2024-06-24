import type { DataSourceOptions, MixedList, EntitySchema } from "typeorm";
import path from "node:path";

export function getSQLiteOptions(payload: {
  entities: MixedList<Function | string | EntitySchema>;
  synchronize: boolean;
  logging: boolean;
}): DataSourceOptions {
  if (!process.env.SQLITE_PATH) {
    throw new Error("Please provide the path to the SQLite database");
  }

  return {
    type: "sqlite",
    database: path.join(
      process.cwd(),
      process.env.SQLITE_PATH,
      "/database.sqlite",
    ),
    ...payload,
  };
}
