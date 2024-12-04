import "dotenv/config";
import mongoose from "mongoose";

let database: typeof mongoose | null = null;

export const connectTestDB = async () => {
  if (!database) {
    database = await mongoose.connect(process.env.MONGO_URI as string);
  }
};

export const disconnectTestDB = async () => {
  if (database) {
    await mongoose.connection.close();
    database = null;
  }
};
