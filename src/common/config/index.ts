import dotenv from "dotenv";
import { IConfig } from "../interfaces/interface";

dotenv.config();

export const config: IConfig = {
  serverPort: process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 7777,
  jwtKey: process.env.JWT_KEY || "",
  databaseUrl: process.env.DATABASE_URL || "",
};
