// const express = require("express");
import express from "express";
// import dotenv from "dotenv"
import "dotenv/config"
import { connectDB } from "./lib/db.js";
// const PORT = 3000;
import { clerkMiddleware } from '@clerk/express';
import cors from 'cors'

const app = express();

const PORT = process.env.PORT;
const FRONTENDURL = process.env.FRONTENDURL;
// middleWare
app.use(express.json());
app.use(cors({origin:FRONTENDURL, credentials: true}));
app.use(clerkMiddleware());


app.get("/health", (req,res) => {
    res.status(200).json({ ok: true });
})

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`)
})