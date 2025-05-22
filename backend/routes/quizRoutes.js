import express from "express";
import { generateQuizz, submitAnswers, history, getQuizById} from "../controllers/quizController.js";

const router = express.Router();


router.post("/generate", generateQuizz);

router.post("/submit", submitAnswers);

router.get("/history", history);

router.get("/:quizId", getQuizById );


export default router;

