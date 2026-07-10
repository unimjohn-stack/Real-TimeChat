import express from "express";
import { checkAuth } from "../controller/authController.js";
import { protectRoute } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.get(".check", protectRoute, checkAuth);

export default router;