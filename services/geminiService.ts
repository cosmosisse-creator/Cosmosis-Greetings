
import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedWish } from "../types.ts";

export const generateWish = async (): Promise<GeneratedWish> => {
  const apiKey = (typeof process !== 'undefined' && process.env) ? process.env.API_KEY : '';
  const ai = new GoogleGenAI({ apiKey: apiKey || "" });
  
  const prompt = `You are the creative director at "Cosmosis", a high-end media agency. 
  Write a sophisticated, poetic, and professional seasonal greeting for our valued clients.
  
  Context:
  - The client is clicking a link from an email to see this.
  - We want to thank them for trusting Cosmosis with their vision and brand.
  - Themes: Cosmic, focus, clarity, partnership, gratitude, framing the future.
  - Occasion: General Seasonal Greetings (covering Holidays and New Year).
  
  Requirements:
  1. Use "You" to address the client directly.
  2. Tone: Elegant, slightly futuristic, and deeply grateful.
  3. Length: 60-90 words.
  4. Output a subject line (title) and the main body text.
  5. The subject line should be short and evocative (e.g., "A Vision for the Year Ahead").`;

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

  const result = JSON.parse(response.text);
  return {
    text: result.text,
    subjectLine: result.subjectLine
  };
};
