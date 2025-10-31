import { Router } from "express";
import {
  getCurrentUser,
  loggedInUser,
  loggedOutUser,
  registerUser,
} from "../controllers/user.controller.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();
router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser
);
router.route("/login").post(loggedInUser);
router.route("/current-user").get(jwtVerify, getCurrentUser);
router.route("/logout").post(jwtVerify, loggedOutUser);

export default router;
