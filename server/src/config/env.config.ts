import { getEnv } from "../utils/get-env.util";

export const Env = {
  NODE_ENV: getEnv("NODE_ENV", "development"),
  PORT: getEnv("PORT", "3000"),
  JWT_SECRET: getEnv("JWT_SECRET", "your_jwt_secret"),
  JWT_EXPIRES_IN: getEnv("JWT_EXPIRES_IN", "1d"),
  FRONTEND_URL: getEnv("FRONTEND_URL", "http://localhost:5173"),
  DATABASE_URL: getEnv("DATABASE_URL"),
} as const;
