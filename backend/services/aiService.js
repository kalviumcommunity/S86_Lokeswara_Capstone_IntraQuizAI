import dotenv from "dotenv";
dotenv.config();
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing in environment variables.");
}

const ai = new GoogleGenAI({ apiKey });

async function generateQuestions(numQuestions, topic) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Generate ${numQuestions} multiple-choice quiz questions on the topic of ${topic}.
Each question should include:
-> A clear and concise question string.
-> Exactly 4 options labeled a, b, c, and d.
-> The correct answer (from the options) example answer:"answer" not the key a, b, c, or d provide the answer.
-> Provide in array of JSON.`,
    });

    const text = response.text;
    const cleaned = text
      .replace(/```(?:json)?\n?/g, "")
      .replace(/```/g, "")
      .trim();

    const quizData = JSON.parse(cleaned);
    return quizData;

  } catch (error) {
    console.error("Failed to generate questions:", error.message);
    throw error;
  }
}

export default generateQuestions;
