require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Secret key for signing JWTs
const JWT_SECRET = process.env.JWT_SECRET || "AdvancedPOS";
// const JWT_EXPIRES_IN = "1000h"; // Token expiration time (adjust as needed)
const JWT_EXPIRES_IN = "5y"; // Token expiration time (adjust as needed)

// Hash a password
async function hashPassword(password) {
  const saltRounds = 10; // Number of salt rounds for bcrypt
  return await bcrypt.hash(password, saltRounds);
}

// Verify a password against a hash
async function verifyPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

// Generate a JWT with email, role, and datetime
function generateToken(id, email, role) {
  const payload = {
    id,
    email,
    role,
    datetime: new Date().toISOString(), // Add current timestamp
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// Verify a JWT
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error("JWT verification error:", error);
    return null; // Invalid token
  }
}

// Decode a JWT without verifying (useful for extracting payload)
function decodeToken(token) {
  return jwt.decode(token);
}

// Middleware to protect routes
function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token is required" });
  }

  const token = authHeader.split(" ")[1];
  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  req.user = decoded; // Attach user payload to the request object
  next(); // Proceed to the next middleware or route handler
}

module.exports = {
  authenticateJWT,
  decodeToken,
  verifyToken,
  generateToken,
  verifyPassword,
  hashPassword,
};
