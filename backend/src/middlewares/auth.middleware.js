import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { AsyncHandler } from "../utils/Asynchandler.js";
import { User } from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();

export const jwtVerify = AsyncHandler(async (req, _, next) => {
  if (req.cookies?.accessToken) {
    console.log("Cookies");
  } else {
    console.log("no");
  }
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(400, "Unauthorized request");
    }
    console.log(token);

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid access token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid access token");
  }
});
