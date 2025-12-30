
const { GoogleGenerativeAI } = require('@google/generative-ai');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const genAI = new GoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const { data } = req.body;
    const prompt = `
      Analyze this household financial data for a family in Zambia (ZMW currency).
      Current Month Summary: ${JSON.stringify(data)}

      Provide 3 concise, actionable financial tips for this family.
      Focus on budget adherence, savings goals, and Zambian context.
      Keep it encouraging and professional.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const advice = response.candidates?.[0]?.content?.parts?.[0]?.text || "Keep tracking your expenses to gain better insights into your spending patterns!";

    res.status(200).json({ advice });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: 'Failed to fetch financial advice.' });
  }
};
