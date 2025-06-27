import express from 'express';
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import "./config/googlePassport.js";
import { connectDB } from "./config/db.js";



const app = express();
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);


app.use(express.json());

app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());



// MongoDB Connection 
connectDB();


// Importing Routes
import quizRoute from "./routes/quizRoutes.js";
import articleRoute from "./routes/articleRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import googleAuthRoutes from "./routes/googleAuthRoutes.js";

// API Routes
app.use("/iq/quiz", quizRoute);
app.use("/iq/articles", articleRoute);
// Auth Routes
app.use("/iq/auth", authRoutes);
app.use("/iq/googleauth", googleAuthRoutes);



app.get('/', (req, res) => {
  res.status(200).json({ message: 'IntraQuiz AI Backend Running Successfully'});
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});