
import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedWish } from "../types.ts";

/**
 * Utility to safely parse JSON from the model response.
 * Handles cases where the model might wrap JSON in markdown blocks.
 */
const parseJSONResponse = (text: string) => {
  try {
    // Remove markdown code blocks if present
    const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(cleaned);
  } catch (e) {
    console.error("Failed to parse Gemini response as JSON. Raw text:", text);
    throw new Error("Malformed AI response");
  }
};

export const generateWish = async (): Promise<GeneratedWish> => {
  const apiKey = (typeof process !== 'undefined' && process.env) ? process.env.API_KEY : '';
  
  if (!apiKey) {
    console.error("Cosmosis Error: API_KEY is missing. Please set it in your environment variables.");
    throw new Error("Missing API Key");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `You are the creative director at "Cosmosis", a high-end media agency. 
  Write a sophisticated, poetic, and professional seasonal greeting for our valued clients.
  
  Context:
  - The client is clicking a link from an email to see this appreciation page.
  - We want to thank them for trusting Cosmosis with their vision, brand, and media strategy.
  - Themes: Cosmic perspective, clarity of focus, creative partnership, gratitude, framing the future.
  - Occasion: General Seasonal Greetings (covering Holidays and the New Year).
  
  Requirements:
  1. Use "You" to address the client directly.
  2. Tone: Elegant, slightly futuristic, and deeply grateful.
  3. Length: 60-90 words.
  4. Output a subject line (title) and the main body text.
  5. The subject line should be short and evocative (e.g., "A New Lens for the New Year").
  
  IMPORTANT: Return ONLY valid JSON in this exact format:
  {
    "text": "The message body...",
    "subjectLine": "The subject title..."
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
      throw new Error("Empty response from AI");
    }

    const result = parseJSONResponse(text);
    return {
      text: result.text,
      subjectLine: result.subjectLine
    };
  } catch (error: any) {
    console.error("Gemini API Error details:", error);
    throw error;
  }
};
