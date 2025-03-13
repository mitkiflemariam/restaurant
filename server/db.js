const mongoose = require("mongoose");

require("dotenv").config();
const DB_URI = process.env.MONGO_URI;

async function DBconnect() {
  try {
    await mongoose.connect(DB_URI);
    console.log("Database connection succesful");
    mongoose.connection.on("error", () => {
      console.log("Databas connection error: ", err);
    });
  } catch (error) {
    console.error("Initial connection error:", error);
    process.exit(1);
  }
}

module.exports = DBconnect;
