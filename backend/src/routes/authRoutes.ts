import express from "express";
const router = express.Router();
import { usersignup, userLogin } from "../controllers/authController";

router.post("/signup", usersignup);
router.post("/login", userLogin);

export default router;