import express from "express";
import { generateQuizz,history,submitAnswers, getQuizById, updateQuiz, deleteQuiz, deleteAllQuizzes } from "../controllers/quizController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();


router.post("/generate",isAuthenticated, generateQuizz);

router.post("/submit", isAuthenticated, submitAnswers);
router.get("/history", isAuthenticated, history);

router.get("/", isAuthenticated, getQuizById );


router.put("/:quizId", isAuthenticated, updateQuiz);

router.delete("/:quizId", isAuthenticated, deleteQuiz );

router.delete("/history/all", isAuthenticated, deleteAllQuizzes );


export default router;