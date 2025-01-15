const express = require("express");
const {
  createChatbotData,
  getChatbotDataById,
  getAllChatbotData
} = require("../controllers/chatbot.controller");
const webRouter = express.Router();

webRouter
  .post("/chatbot/create", createChatbotData)
  .post("/chatbot/get", getAllChatbotData)
  .post("/chatbot/getbyid", getChatbotDataById);

module.exports = webRouter;
