import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  const mongoUrl = process.env.MONGO_URI;

  if (!mongoUrl) {
    throw new Error("MONGO_URI is not defined in .env");
  }

  await mongoose.connect(mongoUrl);
  console.log("✅ MongoDB connected");
};

export default connectDB;
