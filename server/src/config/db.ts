import mongoose from "mongoose";

mongoose.set("strictQuery", true);

export default async (URI: string) => {
  try {
    const conn = await mongoose.connect(URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
