import type { DataSourceOptions, MixedList, EntitySchema } from "typeorm";

export function getMySQLOptions(payload: {
  entities: MixedList<Function | string | EntitySchema>;
  synchronize: boolean;
  logging: boolean;
}): DataSourceOptions {
  if (
    !process.env.MYSQL_HOST ||
    !process.env.MYSQL_PORT ||
    !process.env.MYSQL_USER ||
    !process.env.MYSQL_PASSWORD ||
    !process.env.MYSQL_DATABASE
  ) {
    throw new Error(
      "Please provide the MySQL database connection settings in the environment",
    );
  }

  return {
    type: "mysql",
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    ...payload,
  };
}
