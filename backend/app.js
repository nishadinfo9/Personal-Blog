import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
export const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
import userRouter from "./src/routers/user.router.js";

//router
app.use("/api/v1/auth", userRouter);
