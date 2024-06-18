import { DataSource } from "typeorm";
import { UserEntity } from "./entities/UserEntity.mjs";
import path from "node:path";
import type { DataSourceOptions } from "typeorm";

const currentWorkingDirectory = process.cwd();

const options: DataSourceOptions = {
  type: "sqlite",
  database: path.join(
    currentWorkingDirectory,
    process.env.DB_PATH,
    "/database.sqlite",
  ),
  synchronize: process.env.NODE_ENV === "development",
  logging: true,
  entities: [UserEntity],
};

export const appDataSource = new DataSource(options).initialize();
