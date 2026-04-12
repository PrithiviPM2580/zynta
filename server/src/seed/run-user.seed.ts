import "dotenv/config";
import mongoose from "mongoose";
import { connectDatabase } from "../config/database.config";
import { seedUsers } from "./user.seed";

const run = async () => {
  try {
    await connectDatabase();

    const result = await seedUsers();
    console.log(result);
  } catch (error) {
    console.error("Failed to seed users:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

void run();
