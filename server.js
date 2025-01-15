// Modules and packages
require("dotenv").config();
const express = require("express");
const server = express();
const port = process.env.PORT || 8000;
const cors = require("cors");
const webRouter = require("./routes/web.router");
const { roleBasedAccess } = require("./middlewares/auth");

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
server.use("/", roleBasedAccess(["APP"]), webRouter);
// server.use("/admin", roleBasedAccess["ADMIN"], chatbotRouter);
// server.use("/retailer", roleBasedAccess["RETAILER"], chatbotRouter);
// server.use("/organization", roleBasedAccess["ORGANIZATION"], chatbotRouter);

// Listening
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
