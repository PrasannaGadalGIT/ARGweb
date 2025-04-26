import express from "express";
const router = express.Router();
import { usersignup } from "../controllers/authController";

router.post("/api/signup", usersignup);

export default router;