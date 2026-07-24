// import { getAuth } from "@clerk/express";
// import User from "../models/userModel.js";


// export async function protectRoute(req, res, next) {
//     try {
//         const auth = getAuth(req);

// console.log("===== protectRoute =====");
// console.log("Authorization:", req.headers.authorization);
// console.log("Cookie:", req.headers.cookie);
// console.log("Auth object:", auth);
// console.log(process.env.CLERK_SECRET_KEY?.slice(0,20));

// const { userId } = auth;

//         if (!userId) {
//             res.status(401).json({ message: "Unauthorized"});
//             return;
//         }
//         const user = await User.findOne({ clerkId:userId });
//         console.log("Mongo user:", user);
//         if (!user) {
//             res.status(401).json({ message: "User Profile not synced yet" });
//             return;
//         }

//         req.user = user 
//         next()
//     } catch(error) {
//         console.error("Error in protectRoute middleware:", error);
//         return res.status(500).json({
//         message: "Internal Server Error",
//         });
//     }
// }

import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const protectRoute = async (req, res, next) => {
    try {

        console.log("===== PROTECT ROUTE =====");
        console.log("Origin:", req.headers.origin);
        console.log("Cookie header:", req.headers.cookie);
        console.log("URL:", req.originalUrl);
        console.log("Parsed cookies:", req.cookies);

        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized - No token",
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId).select("-password");
        if(!user) {
            return res.status(401).json({
                message: "User not found",
            });
        }
        req.user = user;
        next();
    }
    catch(error) {
        console.error("Protect Route Error:", error.message);
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
};