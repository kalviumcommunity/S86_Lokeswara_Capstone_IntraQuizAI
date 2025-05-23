import express from "express";
import { generateQuizz, submitAnswers, history, getQuizById, deleteQuiz, deleteAllQuizzes} from "../controllers/quizController.js";

const router = express.Router();


router.post("/generate", generateQuizz);

router.post("/submit", submitAnswers);

router.get("/history", history);

router.get("/:quizId", getQuizById );

router.delete("/:quizId", deleteQuiz );

router.delete("/history/all", deleteAllQuizzes );


export default router;

