const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const OpenAI = require('openai');
const config = require('../../config/config');
const Configuration = require("openai");

const configuration = new Configuration({
    apiKey: config.OPENAI_API_KEY
})
const openai = new OpenAI(configuration);

class ChatService {
  async createMessage(data) {
    const currentTime = new Date();

    const userMessage = data.message;

    if (!userMessage || userMessage.trim() === "") {
      return false;
    }

    try {
      const response = await openai.chat.completions.create({
        //model: "gpt-4o-mini",
        model: "gpt-4o",
        //model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Sen bir yardımcı asistansın." },
          { role: "user", content: userMessage },
        ],
      });

      const botResponse = response.choices[0].message.content;
      await prisma.message.create({
        data: {
            role:"user",
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

module.exports = new ChatService();