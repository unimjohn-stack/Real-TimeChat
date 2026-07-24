// const express = require("express");
// import dotenv from "dotenv"
// console.log("Publishable:", process.env.CLERK_PUBLISHABLE_KEY);
// console.log("Secret:", process.env.CLERK_SECRET_KEY?.slice(0,20));
// const PORT = 3000;
// import { clerkMiddleware } from '@clerk/express';
// import webhookRouter from "./routes/webhook.js"
// import clerkwebhook from './webhooks/clerk.webhook.js'
// const app = express();
// app.use(cors({origin:FRONTENDURL, credentials: true}));
// app.use(clerkMiddleware());
// app.use(clerkMiddleware({
//   publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
//   secretKey: process.env.CLERK_SECRET_KEY,
// }));
import express from "express";
import "dotenv/config";
import fs from "fs";
import path from "path";
import { connectDB } from "./lib/db.js";
import cors from 'cors'
import job from "./lib/cron.js";
import authRoutes from './routes/authRoute.js'
import messageRoute from './routes/messageRoutes.js'
import { app, server } from "./lib/socket.js";
import cookieParser from 'cookie-parser';


const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;
console.log("FRONTEND_URL:", FRONTEND_URL);
console.log("NODE_ENV:", process.env.NODE_ENV);

// console.log("Secret length:", process.env.CLERK_SECRET_KEY?.length);

app.use(cookieParser());
app.use("trust proxy", 1);
app.use(cors({
    origin:FRONTEND_URL,
    credentials: true,
}));
app.use(express.json());
const publicDir = path.join(process.cwd(), "public")
// middleWare
// app.use("/api/webhooks", express.raw({ type: "application/json"}), clerkwebhook);


app.get("/health", (req,res) => {
    res.status(200).json({ ok: true });
});
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoute);

if(fs.existsSync(publicDir)){
    app.use(express.static(publicDir));
    app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(publicDir, "index.html"));
});
}

server.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`)
    
    if (process.env.NODE_ENV === "production") {
        job.start()
    }
})