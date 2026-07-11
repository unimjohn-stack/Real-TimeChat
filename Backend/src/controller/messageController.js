import User from "../models/userModel.js";
import Message from '../models/messageModel.js'
import { hasImageKitConfig, uploadChatMedia } from "../lib/imagekit.js";

export async function getUsersForSideBar (req, res) {
    try {
        const loggedInUser = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: loggedInUser}}).select("-clerkId");
        res.status(200).json(fileredUsers);;
    } catch (error) {
        console.error("Error in getUsersForSideBar:", error.message);
        res.status(500).json({ message: "Internal Server Error"});
    }
}

export async function getConversationsForSideBar(req, res) {
    try {
        const loggedInUserId = req.user._id;
        const conversations = await Message.aggregate([
            // Keep Only Messages sent
            { $match: { $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }] } },
            // The partner is the other person in text chain
            { $group: { _id: [{ $cond: ["$senderId", loggedInUserId], }, "receiverId", "$senderId"] }, lastMessageAt: { $max: "$createdAt" }, },
            // Put most recent conversation at the top
            { $sort: { lastMessageAt: -1 } },
            // Look Up each Partners user Profile and return as an array
            { $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "user" } },
            // Pull Out profile from array and make it a docuement
            { $replaceRoot: { newRoot: { $first: "user" } } },
            // Hide Private ClerkId from result
            { $project: { clerkId: 0 } },
        ]);

        res.status(200).json(conversations);
    } catch(error) {
        console.error("Error in getConversationsForSideBar:", error.message);
        res.status(500).json({ message: "Internal Server Error"})
    }
}

export async function getMessages (req, res) {
    try {
        const {id: userToChatId} = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                {senderId:myId, receiverId: userToChatId},
                {senderId: userToChatId, receiverId: myId},
            ]
        }).sort({ createdAt:1})

        res.status(200).json(messages);
    } catch(error) {
        console.error("Error in getMessages:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function sendMessages (req, res) {
    try {
        const { text } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        let videoUrl;

        if(req.file) {
            if(!hasImageKitConfig()) {
                return res.status(500).json({ message: "Media Upload not configured"})
            }
            const url = await uploadChatMedia(req.file);
            if (req.file.mimetype.startsWith("video/")) videoUrl = url;
            else imageUrl = url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text, 
            image: imageUrl,
            video: videoUrl,
        })
        await newMessage.save();
        res.status(201).json(newMessage)
    } catch(error) {
        console.error("Error in sendMessages", error.message);
        res.status(500).json("Internal Server Error");
    }
}