import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.quizToken;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Store the decoded user data in req.user
    req.user = { _id: decoded.userId }; // or just `decoded` if you want to store more than just userId
    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    res.status(500).json({ message: error.message, success: false });
  }
};
