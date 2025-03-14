const express = require("express");
const { updateOrganization } = require("../controllers/organization.controller");
const { createProduct, updateProduct } = require("../controllers/products.controller");
const { createBlog, updateBlog } = require("../controllers/blogs.controller");
const organizationRouter = express.Router();

organizationRouter
    .post("/update", updateOrganization)
    .post("/product/create", createProduct)
    .post("/product/update", updateProduct)
    .post("/blog/create", createBlog)
    .post("/blog/update", updateBlog)

module.exports = organizationRouter;
