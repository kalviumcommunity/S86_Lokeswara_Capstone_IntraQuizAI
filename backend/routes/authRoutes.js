import express from "express";
import { register,login, logout, forgotPassword, resetPassword, getProfile, updateProfile, deleteProfile, getLoggedInUser } from "../controllers/authController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/logout", logout);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

router.get("/me", getLoggedInUser);


router.get("/profile", isAuthenticated, getProfile);

router.put("/profile", isAuthenticated, updateProfile);

router.delete("/profile", isAuthenticated, deleteProfile);





export default router;