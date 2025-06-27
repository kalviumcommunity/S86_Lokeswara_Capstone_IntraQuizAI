import express from "express";
import passport from "passport";
import { generateToken } from "../config/generateToken.js";

const router = express.Router();


router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));


router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login" }),
  (req, res) => {
    const token = generateToken(req.user._id, res);
    res.redirect(`${process.env.FRONTEND_URL}/oauth-success?token=${token}`);
  }
);


export default router;
