// import { User } from "@clerk/express";

// export async function checkAuth (req,res, next) {
//     if (!req.user) {
//         return res.status(401).json({ message: "Unauthorized"});
//     }
//     res.status(200).json(req.user)
// }
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import { generateToken } from '../utils/generateToken.js';

export const register = async (req,res) => {
    try {
        // console.log("Headers:", req.headers);
        console.log(req.body);
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }
        const normalizedEmail = email.toLowerCase();
        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters",
            });
        }
        
        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists",
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            fullName,
            email: normalizedEmail,
            password: hashedPassword,
        });

        generateToken(user._id, res);

        res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({message: "Internal Server Error",});
    }
};

export const login = async (req,res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            }); 
        }

        const normalizedEmail = email.toLowerCase();
        const user = await User.findOne({
            email: normalizedEmail,
        });
        if (!user) {
            return res.status(400).json({
                message: "Invalid Credentials"
            });
        }
        const isPasswordMatch = await bcrypt.compare( password, user.password);
        if (!isPasswordMatch){
            return res.status(400).json({
                message: "Invalid Credentials",
            });
        }
        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.error("Error in Login:", error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

export const logout = (req,res) => {
    res.cookie("jwt", "", {
        maxAge: 0,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
    });
    return res.status(200).json({
        message: "Logged out successfully",
    });
};

export const checkAuth = (req,res) => {
    return res.status(200).json(req.user);
};
