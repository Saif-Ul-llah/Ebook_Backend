import mongoose from "mongoose";
import { appConfig } from "./app_config";

const connectDatabase = async () => {
  try {
    await mongoose.connect(appConfig.dbUrl);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export { connectDatabase };
