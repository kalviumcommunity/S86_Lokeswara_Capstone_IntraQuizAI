import { generateToken } from "../config/generateToken.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail.js";
import User from "../models/User.js";

export const register = async (req, res) => { 
  
  
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) { 
            return res.status(400).json({ message: "Please fill all the fields" ,success: false});
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) { 
            return res.status(400).json({ message: "User already exists",success : false});
        }
        const user = await User.create({
            name,
            email,
            password
        })
        res.status(201).json({ user ,success: true});
    } catch (error) {
        console.log("Internal Server Error", error.message);
        res.status(500).json({ error: error.message });
        
    }
}

export const login = async (req, res) => { 
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the fields", success: false });
    }

    let user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "User does not exist", success: false });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials", success: false });
    }

    const token = await generateToken(user._id, res);

    user = await User.findById(user._id).select("-password");
    res.status(200).json({ message: "Login successful", user, token, success: true });

  } catch (error) {
    console.log("Internal Server Error", error.message);
    res.status(500).json({ message: error.message, success: false });
  }
};


// Forgot password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist", success: false });
    }

    // Generate reset token
    const resetToken = user.generateResetToken();
    await user.save();

    // Send reset password email
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const message = `Click the link to reset your password: ${resetUrl}`;

    await sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      text: message,
    });

    res.status(200).json({
      message: "Password reset link sent to email",
      success: true,
    });
  } catch (error) {
    console.log("Internal Server Error", error.message);
    res.status(500).json({ message: error.message, success: false });
  }
};

export const resetPassword = async (req, res) => {
  const { resetToken, newPassword } = req.body;

  try {
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired reset token", success: false });
    }

    // Update password
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful", success: true });
  } catch (error) {
    console.log("Internal Server Error", error.message);
    res.status(500).json({ message: error.message, success: false });
  }
};



export const logout = async (req, res) => {
  
  
  res.cookie("quizToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logout successful" ,success: true});
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user, success: true });
  } catch (error) {
    console.error("Error fetching profile:", error.message);
    res.status(500).json({ message: error.message, success: false });
  }
};


export const updateProfile = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;

    await user.save();

    res.status(200).json({ message: "Profile updated successfully", success: true });
  } catch (error) {
    console.error("Error updating profile:", error.message);
    res.status(500).json({ message: error.message, success: false });
  }
};


export const deleteProfile = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    res.cookie("quizToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      expires: new Date(0),
    });

    res.status(200).json({ message: "Profile deleted successfully", success: true });
  } catch (error) {
    console.error("Error deleting profile:", error.message);
    res.status(500).json({ message: error.message, success: false });
  }
};



export const getLoggedInUser = async (req, res) => {
  try {

    const token = req.cookies.quizToken;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.error("Error in getLoggedInUser:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};
