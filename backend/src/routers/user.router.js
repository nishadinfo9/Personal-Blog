import { Router } from "express";
import {
  getCurrentUser,
  loggedInUser,
  loggedOutUser,
  refreshAccessToken,
  registerUser,
} from "../controllers/user.controller.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";
const router = Router();
router.route("/register").post(registerUser);
router.route("/login").post(loggedInUser);
router.route("/current-user").get(jwtVerify, getCurrentUser);
router.route("/logout").post(jwtVerify, loggedOutUser);

export default router;
