// import { checkAuth } from "../controller/authController.js";
// import { protectRoute } from "../Middleware/authMiddleware.js";
import express from "express";
import {register, login, logout, checkAuth } from '../controller/authController.js'
import { protectRoute } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.get("/check", protectRoute, checkAuth);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;