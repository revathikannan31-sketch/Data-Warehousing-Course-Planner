import { GoogleGenAI } from "@google/genai";

// Initialize the client with the API key from environment variables
const apiKey = process.env.API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateGeminiContent = async (prompt: string): Promise<string> => {
  if (!ai) {
    throw new Error("API Key not found. Please ensure process.env.API_KEY is set.");
  }

  try {
    // using gemini-2.5-flash for speed and efficiency for large text generation tasks
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        // A slightly higher temperature for creative educational content
        temperature: 0.4,
        // Ensure we get enough tokens for long course material
        // Note: Thinking budget is not used here to maximize output tokens for text
        maxOutputTokens: 8192, 
      }
    });

    return response.text || "No content generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate content. Please try again.");
  }
};