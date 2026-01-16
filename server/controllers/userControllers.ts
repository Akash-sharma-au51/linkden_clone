import Users from "../models/userModel";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}

// Register a new user

const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password, type } = req.body;
        // Check if user already exists
        const existinguser = await Users.findOne({ email });
        if (existinguser) {
            return res.status(400).json({ message: "User already exists", success: false }) 
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new Users({
            name,
            email,
            password: hashedPassword,
            type
        });
        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({
            message:"User registered successfully",
            success: true,
            data: {
                user: {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    type: newUser.type,
                    avatar: newUser.avatar
                },
                token
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", success: false });


    }

}

// Login user
const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password", success: false });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password", success: false });
        }
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            message: "Login successful",
            success: true,
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    type: user.type,
                    avatar: user.avatar
                },
                token
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", success: false });
    }
}

const logoutUser = async (req: Request, res: Response) => {
    res.clearCookie('token');
    res.status(200).json({ message: "Logout successful", success: true });

}

export { registerUser, loginUser, logoutUser };
