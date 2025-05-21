import express from "express";
import { createArticle } from "../controllers/articleControllers.js";

const router = express.Router();

router.post("/", createArticle);

export default router;
