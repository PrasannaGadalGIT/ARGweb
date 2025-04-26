import z from "zod";
import express from "express";
import bcrypt from "bcrypt";
import { UserModel } from "../models/User";
import { Request, Response } from "express";
import { userLoginSchema, userSignupSchema } from "../schemas/authSchemas";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
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


export const userLogin = async (req:express.Request , res: express.Response) => {
    const { email, password } = userLoginSchema.parse(req.body);
    const user = await UserModel.findOne({
        $or: [
            { email: email },
        ]
      });

      console.log(user?.password);
    // if (!user) {
    //     return res.status(400).json({
    //         message: "User not found",
    //     })
 
    const isPasswordValid = await bcrypt.compare(password, user?.password as string);

    
    const token = jwt.sign({ id: user?._id },  process.env.JWT_SECRET as string, { expiresIn: '1h' });
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({
        message: "User logged in successfully",
        token: token,
    })

  }

