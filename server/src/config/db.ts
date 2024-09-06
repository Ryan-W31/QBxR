import mongoose from "mongoose";
import { MONGODB_URI } from "../constants/env";

const connectToDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to DB", error);
    process.exit(1);
  }
};

export default connectToDB;
