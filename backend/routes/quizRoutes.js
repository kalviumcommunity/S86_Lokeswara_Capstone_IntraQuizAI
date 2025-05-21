import express from "express";
import { generateQuizz, submitAnswers} from "../controllers/quizController.js";

const router = express.Router();


router.post("/generate", generateQuizz);

router.post("/submit", submitAnswers);

export default router;

