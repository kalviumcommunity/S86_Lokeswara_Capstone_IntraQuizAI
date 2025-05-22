import express from "express";
import { createArticle, getArticles, getArticleById } from "../controllers/articleControllers.js";

const router = express.Router();

router.post("/", createArticle);

router.get("/", getArticles);

router.get("/:id", getArticleById);

export default router;
