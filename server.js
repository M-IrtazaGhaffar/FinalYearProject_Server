// Modules and packages
require("dotenv").config();
const express = require("express");
const server = express();
const port = process.env.PORT;
const cors = require("cors");
const webRouter = require("./routes/web.router");
const { roleBasedAccess } = require("./middlewares/auth");
const organizationRouter = require("./routes/organization.router");

// Middlewares
server.use(express.json({ limit: "100mb" }));
server.use(express.urlencoded({ extended: true }));
server.use(
  cors({
    origin: "*",
  })
);

// Testing Server
server.get("/", (req, res) => {
  res.status(200).send("Testing Server!");
});
server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Generate JWT Auth Token

// Routes
server.use("/api", webRouter);
// server.use("/retailer", roleBasedAccess["RETAILER"], chatbotRouter);
server.use(
  "/organization",
  roleBasedAccess(["organization"]),
  organizationRouter
);

// Listening
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
