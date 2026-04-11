import mongoose from "mongoose";
import { Env } from "./env.config";

export const connectDatabase = async () => {
  try {
    await mongoose.connect(Env.DATABASE_URL);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};
