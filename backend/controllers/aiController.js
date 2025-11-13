import OpenAI from "openai";

// Only create OpenAI client if API key is provided
let openai = null;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
}

// AI chat endpoint
export const chatWithAI = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    if (!openai || !process.env.OPENAI_API_KEY) {
      return res.status(503).json({ 
        message: "AI service is not available. OpenAI API key is not configured. Please add OPENAI_API_KEY to your .env file." 
      });
    }

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant for a hostel management system. Help students and admins with their queries about hostel facilities, rules, and general information."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 500,
      temperature: 0.7
    });

    const response = completion.choices[0].message.content;

    res.json({
      response,
      model: "gpt-3.5-turbo"
    });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    res.status(500).json({
      message: "Failed to get AI response",
      error: error.message
    });
  }
};

