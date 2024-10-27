const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

class GeminiService {
  async createMessage(data) {
    const currentTime = new Date();

    const userMessage = data.message;

    try {
      
      const prompt = userMessage;

      const result = await model.generateContent(prompt);

      const botResponse = result.response.text();
      await prisma.message.create({
        data: {
            role:"gemini",
            message: userMessage,
            response: botResponse,
            timestamp: currentTime,
        }
      })

      return botResponse;
    } catch (error) {
      console.error("API isteği sırasında hata:", error);
      return false;
    }
  }
}

module.exports = new GeminiService();