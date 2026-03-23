import mongoose from "mongoose";
const connectDB = async (): Promise<void> => {
  console.log("Connecting to MongoDB...", process.env.MONGO_URI);
  const connection = await mongoose.connect(process.env.MONGO_URI as string);
  console.log(`MongoDB Connected: ${connection.connection.host}`);
};
export default connectDB;
