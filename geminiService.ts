
export const getFinancialAdvice = async (data: any) => {
  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch financial advice.');
    }

    const { advice } = await response.json();
    return advice;
  } catch (error) {
    console.error("Gemini Advice Error:", error);
    return "Start by creating an emergency fund to cover 3-6 months of essential expenses.";
  }
};
