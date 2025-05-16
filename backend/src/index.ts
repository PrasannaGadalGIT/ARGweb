import express from "express";
import z from "zod";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import connectDB from "./dbconnection";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
const corsOptions = {
  origin: 'https://ar-gweb.vercel.app/', 
  optionsSuccessStatus: 200 
};
const app = express();
app.use(express.json());
app.use(cors(corsOptions));
dotenv.config();

connectDB();




app.use('/api', authRoutes );


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
}
);