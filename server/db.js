const mongoose = require("mongoose");

require("dotenv").config();
const DB_URI = process.env.MONGO_URI;

async function DBconnect() {
  try {
    await mongoose.connect(DB_URI || "mongodb://admin:password@mongodb:27017");
    console.log("Database connection succesful");
    mongoose.connection.on("error", () => {
      console.log("Databas connection error: ", err);
    });
  } catch (error) {
    console.error("Initial connection error:", error);
    process.exit(1);
  }

  // mongoose
  // .connect(
  //   process.env.MONGO_URI || "mongodb://admin:password@mongodb:27017",
  //   { useNewUrlParser: true, useUnifiedTopology: true }
  // )
  // .then(() => console.log("Connected to MongoDB"))
  // .catch((err) => console.error("MongoDB connection error:", err));
}

module.exports = DBconnect;
