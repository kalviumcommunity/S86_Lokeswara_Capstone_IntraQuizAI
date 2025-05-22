import Quiz from "../models/Quiz.js";
import generateQuestions from "../services/aiService.js";

// Generate Quiz using aiService Gemini API
export const generateQuizz = async (req, res) => {
  const { topic, numQuestions } = req.body;

  try {
    if (!topic || !numQuestions) {
      return res.status(400).json({
        message: "Please fill all the fields",
        success: false,
      });
    }

    const quizData = await generateQuestions(numQuestions, topic);

    if (!quizData) {
      return res.status(400).json({
        message: "Failed to generate quiz",
        success: false,
      });
    }

    const newQuiz = new Quiz({
      topic,
      score: 0,
      totalQuestions: numQuestions,
      correctAnswers: 0,
      wrongAnswers: 0,
      submitData: [],
    });

    await newQuiz.save();

    res.status(200).json({ quizData, success: true });
  } catch (error) {
    console.error("Internal Server Error:", error.message);
    res.status(500).json({ error: error.message, success: false });
  }
};

// Submitting Quiz Answers and Calculating Score
export const submitAnswers = async (req, res) => {
  const { answers, topic } = req.body;

  try {
    if (!answers || answers.length === 0 || !topic) {
      return res.status(400).json({
        message: "Invalid submission data",
        success: false,
      });
    }

    let correct = 0;

    answers.forEach((ans) => {
      if (ans.correctAnswer === ans.userAnswer) {
        correct++;
      }
    });

    const newQuiz = new Quiz({
      topic,
      score: correct,
      totalQuestions: answers.length,
      correctAnswers: correct,
      wrongAnswers: answers.length - correct,
      submitData: answers,
    });

    await newQuiz.save();

    res.status(200).json({
      message: "Answers submitted successfully",
      success: true,
    });
  } catch (error) {
    console.error("Internal Server Error:", error.message);
    res.status(500).json({ error: error.message, success: false });
  }
};


// Get Generated quiz history
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

// Get quiz by ID
export const getQuizById = async (req, res) => {
  const { quizId } = req.params;

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
