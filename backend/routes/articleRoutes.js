import express from "express";
import {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
} from "../controllers/articleControllers.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js"; // Middleware to ensure the user is authenticated

const router = express.Router();

router.post("/", isAuthenticated, createArticle);

router.get("/", getArticles);

router.get("/:id", getArticleById);

router.put("/:id", isAuthenticated, updateArticle);

router.delete("/:id", isAuthenticated, deleteArticle);

export default router;
