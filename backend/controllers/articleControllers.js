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


// Get all articles
export const getArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.status(200).json({ articles, success: true });
  } catch (error) {
    console.log("Error fetching articles:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};


// Get a single article by ID
export const getArticleById = async (req, res) => {
  const { id } = req.params;

  try {
    const article = await Article.findById(id);

    if (!article) {
      return res.status(404).json({ message: "Article not found", success: false });
    }

    res.status(200).json({ article, success: true });
  } catch (error) {
    console.log("Error fetching article:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};


// Update an article
export const updateArticle = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const article = await Article.findById(id);

    if (!article) {
      return res.status(404).json({ message: "Article not found", success: false });
    }

    article.title = title || article.title;
    article.content = content || article.content;
    article.updatedAt = Date.now(); 
    
    await article.save();
    res.status(200).json({ message: "Article updated successfully", success: true, article });
  } catch (error) {
    console.log("Error updating article:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};


// Delete an article
export const deleteArticle = async (req, res) => {
  const { id } = req.params;

  try {
    const article = await Article.findById(id);

    if (!article) {
      return res.status(404).json({ message: "Article not found", success: false });
    }

    await article.remove();
    res.status(200).json({ message: "Article deleted successfully", success: true });
  } catch (error) {
    console.log("Error deleting article:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};
