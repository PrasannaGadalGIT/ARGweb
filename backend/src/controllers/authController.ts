import z from "zod";
import bcrypt from "bcrypt";
import { UserModel } from "../models/User";
import { Request, Response } from "express";


const userSignupSchema = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username cannot be longer than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  email: z.string()
    .email("Invalid email address")
    .min(3, "Email must be at least 3 characters long")
    .max(50, "Email cannot be longer than 50 characters"),
  password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});


export const usersignup = async (req:Request , res: Response) => {
    const validatedData = userSignupSchema.parse(req.body);
    const { email, password, username } = validatedData;
  
    const hashedPaswword = await bcrypt.hash(password, 10);
    const existingUser = await UserModel.findOne({
      $or: [
        { email },
        { username }
      ]
    });
    if (!existingUser) {
      const user = await UserModel.create({
        username: username,
        email: email,
        password: hashedPaswword
      })
      res.status(200).json({
        user: user,
        message: "User created successfully",
      })
    } else {
      res.status(400).json({
        message: "User already exists",
      })
    }
  
};

