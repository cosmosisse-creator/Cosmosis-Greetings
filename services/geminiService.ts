
import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedWish } from "../types.ts";

/**
 * Utility to safely parse JSON from the model response.
 * Handles cases where the model might wrap JSON in markdown blocks.
 */
const parseJSONResponse = (text: string) => {
  try {
    // Aggressively clean markdown blocks
    const cleaned = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();
    return JSON.parse(cleaned);
  } catch (e) {
    console.error("Failed to parse Gemini response as JSON. Raw text:", text);
    throw new Error("The AI provided a message in an unexpected format. Please try again.");
  }
};

export const generateWish = async (): Promise<GeneratedWish> => {
  // Check common locations for the API Key
  const apiKey = (typeof process !== 'undefined' && process.env?.API_KEY) 
    ? process.env.API_KEY 
    : (window as any).process?.env?.API_KEY;
  
  if (!apiKey || apiKey === '') {
    console.error("Cosmosis Critical Error: API_KEY is missing from environment.");
    throw new Error("Missing API Key. Ensure 'API_KEY' is set in Vercel project settings.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `You are the creative director at "Cosmosis", a premium media agency. 
  Write a sophisticated, poetic, and professional seasonal greeting for our valued clients.
  
  Context:
  - We are thanking them for a year of creative partnership and trusting us with their vision.
  - Themes: Deep focus, clarity, cosmic perspective, future-framing.
  - Tone: High-end, visionary, and genuinely appreciative.
  
  Format Requirements:
  - Subject Line: Short and evocative (max 6 words).
  - Body: 2-3 short, powerful paragraphs (max 90 words total).
  - Address the reader as "You".
  
  Return valid JSON:
  {
    "text": "Greeting text...",
    "subjectLine": "Title..."
  }`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING },
            subjectLine: { type: Type.STRING }
          },
          required: ["text", "subjectLine"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("The universe returned an empty response. Please try again.");
    }

    const result = parseJSONResponse(text);
    return {
      text: result.text,
      subjectLine: result.subjectLine
    };
  } catch (error: any) {
    // If the error has a status, it's likely an API problem
    if (error.status) {
      console.error(`Gemini API returned status ${error.status}:`, error);
      throw new Error(`Google API Error (${error.status}): ${error.message || 'Check your API Key permissions.'}`);
    }
    throw error;
  }
};
