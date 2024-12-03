import "dotenv/config";
import { Response } from "express";
import mongoose from "mongoose";
import { HttpResponse } from "../error/validation.error";

const httpResponse = new HttpResponse();

export const mongoConnection = async (res?: Response): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("MongoDB connection established");
    if (res) httpResponse.Ok(res, "MongoDB connection established");
  } catch (error: any) {
    console.log("Error connecting to MongoDB: ", error.message);
    if (res) httpResponse.Error(error, "Error connecting to Mongo");
  }
};
