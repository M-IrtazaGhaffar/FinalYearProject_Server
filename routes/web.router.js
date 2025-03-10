const express = require("express");
const {
  createChatbotData,
  getChatbotDataById,
  getAllChatbotData,
} = require("../controllers/chatbot.controller");
const { getBlogById, getAllBlogs } = require("../controllers/blogs.controller");
const {
  createOrganization,
  organizationLogin,
  getAllOrganizations,
  getOrganizationById,
} = require("../controllers/organization.controller");
const { createRetailer, retailerLogin, getAllRetailers, getRetailerById } = require("../controllers/retailer.controller");
const { searchAll } = require("../controllers/admin.controller");
const { getAllProducts, getProductById } = require("../controllers/products.controller");
const webRouter = express.Router();

webRouter
  // auth
  .post("/organization/create", createOrganization)
  .post("/organization/login", organizationLogin)
  .post("/retailer/create", createRetailer)
  .post("/retailer/login", retailerLogin)
  // public
  .post("/search", searchAll)
  .post("/chatbot/create", createChatbotData)
  .post("/chatbot/get", getAllChatbotData)
  .post("/chatbot/getbyid", getChatbotDataById)
  .post("/blog/get", getAllBlogs)
  .post("/blog/getbyid", getBlogById)
  .post("/organization/get", getAllOrganizations)
  .post("/organization/getbyid", getOrganizationById)
  .post("/retailer/get", getAllRetailers)
  .post("/retailer/getbyid", getRetailerById)
  .post("/product/get", getAllProducts)
  .post("/product/getbyid", getProductById)

module.exports = webRouter;
