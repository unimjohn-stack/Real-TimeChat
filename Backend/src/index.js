// const express = require("express");
import express from "express";
// import dotenv from "dotenv"
import "dotenv/config";
import fs from "fs";
import path from "path";
import { connectDB } from "./lib/db.js";
// const PORT = 3000;
import { clerkMiddleware } from '@clerk/express';
import cors from 'cors'
import job from "./lib/cron.js";
// import webhookRouter from "./routes/webhook.js"
import clerkwebhook from './webhooks/clerk.webhook.js'
import authRoutes from './routes/authRoute.js'

const app = express();

const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;

app.use(cors({
    origin:FRONTEND_URL,
    credentials: true,
}));
const publicDir = path.join(process.cwd(), "public")
// middleWare
app.use("/api/webhooks", express.raw({ type: "application/json"}), clerkwebhook);
app.use(express.json());
// app.use(cors({origin:FRONTENDURL, credentials: true}));
app.use(clerkMiddleware());


app.get("/health", (req,res) => {
    res.status(200).json({ ok: true });
});
app.use("api/auth", authRoutes);

if(fs.existsSync(publicDir)){
    app.use(express.static(publicDir));
    app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(publicDir, "index.html"));
});
}

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`)
    
    if (process.env.NODE_ENV === "production") {
        job.start()
    }
})