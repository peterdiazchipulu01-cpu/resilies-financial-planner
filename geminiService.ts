
import { GoogleGenAI } from "@google/genai";

// Initialize the GoogleGenAI client using the API key directly from process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getFinancialAdvice = async (data: any) => {
  try {
    // Using gemini-3-flash-preview as the recommended model for basic text analysis and Q&A tasks
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        Analyze this household financial data for a family in Zambia (ZMW currency).
        Current Month Summary: ${JSON.stringify(data)}
        
        Provide 3 concise, actionable financial tips for this family. 
        Focus on budget adherence, savings goals, and Zambian context.
        Keep it encouraging and professional.
      `,
    });
    // Access the generated text using the .text property (not a method)
    return response.text || "Keep tracking your expenses to gain better insights into your spending patterns!";
  } catch (error) {
    console.error("Gemini Advice Error:", error);
    return "Start by creating an emergency fund to cover 3-6 months of essential expenses.";
  }
};
