import { getAuth } from "@clerk/express";
import User from "../models/userModel";
// import router from "../webhooks/clerk.webhook";

export async function protectRoute(req, res, next) {
    try {
        const {userId} = getAuth(req);

        if (!userId) {
            res.status(401).json({ message: "Unauthorized"});
            return;
        }
        const user = await User.findOne({ clerkId:userId });
        if (!userId) {
            res.status(401).json({ message: "User Profile not synced yet" });
            return;
        }

        req.user = user 
        next()
    } catch(error) {
        console.error("Error in protectRoute middleware:", error.message);
    }
}