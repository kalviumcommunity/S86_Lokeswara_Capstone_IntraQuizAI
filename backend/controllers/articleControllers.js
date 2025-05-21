import Article from "../models/SupportArticle.js";


// Create an article
export const createArticle = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.userId;

  try {
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required", success: false });
    }

    const newArticle = new Article({
      title,
      content,
      author: userId,
    });

    await newArticle.save();
    res.status(201).json({ message: "Article created successfully", success: true, article: newArticle });
  } catch (error) {
    console.log("Internal Server Error", error.message);
    res.status(500).json({ error: error.message, success: false });
  }
};
