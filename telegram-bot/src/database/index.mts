import { DataSource } from "typeorm";
import { UserEntity } from "./entities/UserEntity.mjs";
import type { DataSourceOptions } from "typeorm";
import { getMySQLOptions } from "./config/mysql.mjs";
import { getSQLiteOptions } from "./config/sqlite.mjs";

const isDev = process.env.NODE_ENV === "development";

function getDataSourceOptions(): DataSourceOptions {
  const options = {
    entities: [UserEntity],
    synchronize: isDev,
    logging: isDev,
  };

  switch (process.env.DATABASE_TYPE) {
    case "mysql":
      return getMySQLOptions(options);
    case "sqlite":
      return getSQLiteOptions(options);
    default:
      throw new Error("Please provide the database type in the environment");
  }
}

export const appDataSource = new DataSource(
  getDataSourceOptions(),
).initialize();
