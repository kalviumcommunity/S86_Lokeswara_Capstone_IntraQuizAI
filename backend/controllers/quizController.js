import Quiz from "../models/Quiz.js";
import generateQuestions from "../services/aiService.js";

// Generate quiz function
export const generateQuizz = async (req, res) => {
  const { topic, numQuestions } = req.body;

  try {
    // Validate input
    if (!topic || !numQuestions) {
      return res
        .status(400)
        .json({ message: "Please fill all the fields", success: false });
    }

    // Generate questions using AI
    const quizData = await generateQuestions(numQuestions, topic);
    if (!quizData) {
      return res
        .status(400)
        .json({ message: "Failed to generate quiz", success: false });
    }

    // Create and save the quiz without quiz code
    const newQuiz = new Quiz({
      user: req.userId,
      topic: topic,
      score: 0, // Initialize score as 0
      totalQuestions: numQuestions,
      correctAnswers: 0,
      wrongAnswers: 0,
      submitData: [],
    });

    await newQuiz.save();
    res.status(200).json({ quizData, success: true });
  } catch (error) {
    console.log("Internal Server Error", error.message);
    res.status(500).json({ error: error.message, success: false });
  }
};

// Submit answers and calculate score
export const submitAnswers = async (req, res) => {
  const { answers, topic } = req.body;
  const userId = req.userId;
  let correct = 0;

  try {
    // Validate input
    if (answers.length <= 0 || !topic) {
      return res
        .status(400)
        .json({ message: "Something went wrong", success: false });
    }

    // Calculate correct answers
    answers.forEach((ans) => {
      if (ans.correctAnswer === ans.userAnswer) {
        correct++;
      }
    });

    // Create and save quiz results
    const newQuiz = new Quiz({
      user: userId,
      topic: topic,
      score: correct,
      totalQuestions: answers.length,
      correctAnswers: correct,
      wrongAnswers: answers.length - correct,
      submitData: answers,
    });

    await newQuiz.save();

    res
      .status(200)
      .json({ message: "Answers submitted successfully", success: true });
  } catch (error) {
    console.log("Internal Server Error", error.message);
    res.status(500).json({ error: error.message, success: false });
  }
};

// Fetch quiz history
export const history = async (req, res) => {
  const userId = req.userId;
  try {
    let history = await Quiz.find({ user: userId })
      .sort({ createdAt: -1 });

    res.status(200).json({ history, success: true });
  } catch (error) {
    console.log("Error fetching history:", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// Fetch quiz by ID (no quiz code required anymore)
export const getQuizById = async (req, res) => {
  const { quizId } = req.params; // Adjusting to use quiz ID instead of quiz code

  try {
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found", success: false });
    }

    res.status(200).json({ quiz, success: true });
  } catch (error) {
    console.log("Error fetching quiz:", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// Update quiz by ID
export const updateQuiz = async (req, res) => {
  const { quizId } = req.params;
  const { topic, submitData } = req.body;

  try {
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found", success: false });
    }

    // Optional: Ensure the user updating the quiz is the creator
    if (quiz.user.toString() !== req.userId) {
      return res.status(403).json({ message: "Unauthorized", success: false });
    }

    if (topic) quiz.topic = topic;
    if (submitData) {
      quiz.submitData = submitData;

      // Recalculate score
      let correct = 0;
      submitData.forEach((ans) => {
        if (ans.correctAnswer === ans.userAnswer) correct++;
      });

      quiz.totalQuestions = submitData.length;
      quiz.correctAnswers = correct;
      quiz.wrongAnswers = submitData.length - correct;
      quiz.score = correct;
    }

    await quiz.save();

    res.status(200).json({ message: "Quiz updated successfully", quiz, success: true });
  } catch (error) {
    console.log("Error updating quiz:", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};


// Delete quiz by ID
export const deleteQuiz = async (req, res) => {
  const { quizId } = req.params;

  try {
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found", success: false });
    }

    // Optional: Ensure the user deleting the quiz is the creator
    if (quiz.user.toString() !== req.userId) {
      return res.status(403).json({ message: "Unauthorized", success: false });
    }

    await Quiz.findByIdAndDelete(quizId);

    res.status(200).json({ message: "Quiz deleted successfully", success: true });
  } catch (error) {
    console.log("Error deleting quiz:", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// Delete all quiz history for a user
export const deleteAllQuizzes = async (req, res) => {
  const userId = req.userId;

  try {
    const result = await Quiz.deleteMany({ user: userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No quizzes found to delete", success: false });
    }

    res.status(200).json({ message: "All quizzes deleted successfully", success: true });
  } catch (error) {
    console.log("Error deleting all quizzes:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};
