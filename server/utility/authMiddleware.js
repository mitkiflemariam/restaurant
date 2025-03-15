const jwt = require("jsonwebtoken");
require("dotenv").config();

// Function to generate reset token (valid for 15 minutes)
const generateResetToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15m" });
};

module.exports = { generateResetToken };