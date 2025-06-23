import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);


app.use(express.json());

// MongoDB Connection 
connectDB();


// Importing Routes
import quizRoute from "./routes/quizRoutes.js";
import articleRoute from "./routes/articleRoutes.js";
import authRoutes from "./routes/authRoutes.js";


// API Routes
app.use("/iq/quiz", quizRoute);
app.use("/iq/articles", articleRoute);
app.use("/iq/auth", authRoutes);



app.get('/', (req, res) => {
  res.status(200).json({ message: 'IntraQuiz AI Backend Running Successfully'});
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});