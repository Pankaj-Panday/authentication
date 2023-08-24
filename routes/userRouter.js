import express from "express";
import { userController } from "../controllers/userController.js";
const router = express.Router();

router
	.route("/signup")
	.get(userController.getSignup)
	.post(userController.postSignup);

router
	.route("/login")
	.get(userController.getLogin)
	.post(userController.postLogin);

router.get("/profile", userController.getUserProfile);

router.get("/logout", userController.logout);

export { router };
