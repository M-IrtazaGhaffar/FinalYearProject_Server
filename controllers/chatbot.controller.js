// controllers/chatbotDataController.js
const { prisma } = require("../config/prisma"); // Import Prisma instance
const ApiResponse = require("../utils/ApiResponse"); // Import the ApiResponse utility

// Create a new chatbot data entry
exports.createChatbotData = async (req, res) => {
  try {
    const { query, solution } = req.body;
    await prisma.chatBotData.create({
      data: { query, solution },
    });
    return ApiResponse.success(res, "Chatbot data created successfully!");
  } catch (error) {
    return ApiResponse.error(res, "Error creating chatbot data", 500);
  }
};

// Retrieve all chatbot data entries
exports.getAllChatbotData = async (req, res) => {
  try {
    const data = await prisma.chatBotData.findMany();
    return ApiResponse.success(
      res,
      "Chatbot data retrieved successfully!",
      data
    );
  } catch (error) {
    return ApiResponse.error(res, "Error fetching chatbot data", 500);
  }
};

// Retrieve a single chatbot data entry by ID
exports.getChatbotDataById = async (req, res) => {
  try {
    const { id } = req.body;
    const data = await prisma.chatBotData.findUnique({
      where: { id: parseInt(id, 10) },
    });
    if (!data) {
      return ApiResponse.notFound(res, "Chatbot data not found");
    }
    return ApiResponse.success(
      res,
      "Chatbot data retrieved successfully!",
      data
    );
  } catch (error) {
    return ApiResponse.error(res, "Error fetching chatbot data", 500);
  }
};

// Delete chatbot data by ID
// exports.deleteChatbotData = async (req, res) => {
//   try {
//     const { id } = req.body;
//     const deletedData = await prisma.chatBotData.delete({
//       where: { id: parseInt(id, 10) },
//     });
//     return ApiResponse.success(res, "Chatbot data deleted successfully!");
//   } catch (error) {
//     return ApiResponse.error(res, "Error deleting chatbot data", 500);
//   }
// };
