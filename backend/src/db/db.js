import { BD_NAME } from "../utils/constents.js";
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connectionInstences = await mongoose.connect(
      `${process.env.BD_URI}/${BD_NAME}`
    );
    console.log(connectionInstences.connection.host);
  } catch (error) {
    console.log("mongoDB connection faild", error);
    process.exit(1);
  }
};
