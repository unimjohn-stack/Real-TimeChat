// import { checkAuth } from "../controller/authController.js";
// import { protectRoute } from "../Middleware/authMiddleware.js";
import express from "express";
import {register, login, logout, checkAuth } from '../controller/authController.js'
import { protectRoute } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.get("/cookie-test", (req, res) => {
    res.cookie("test", "12345", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
    });

    res.json({ success: true });
});
router.get("/check", protectRoute, checkAuth);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;