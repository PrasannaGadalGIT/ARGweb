import { z } from "zod";

export const userLoginSchema = z.object({

email: z.string()
    .email("Invalid email address")
    .min(3, "Email must be at least 3 characters long")
    .max(50, "Email cannot be longer than 50 characters"),
  password: z.string()
    .min(8, "Password must be at least 8 characters long")
});

export const userSignupSchema = z.object({
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