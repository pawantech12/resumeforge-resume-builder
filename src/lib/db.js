import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI)
  throw new Error("Please define the MONGODB_URI in .env.local");

export async function connectToDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connection successfull to database");
  } catch (error) {
    console.error("Database connection unsuccessfull", error);
  }
}
