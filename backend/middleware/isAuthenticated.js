import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.quizToken;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token", success: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { _id: decoded.userId };

    next();
  } catch (error) {
    console.error("Authentication Error:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Session expired. Please log in again.", success: false });
    }

    res.status(401).json({ message: "Invalid token", success: false });
  }
};
