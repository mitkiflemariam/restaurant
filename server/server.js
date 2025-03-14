const express = require("express");
const PORT = 3000;
const connectDB = require("./db");
const userRoutes = require("./routers/userrouter");
const foodItemRoutes = require("./routers/foodItemRoutes");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());
// Routes
app.use("/api/users", userRoutes);
app.use("/api/food-items", foodItemRoutes);



async function startApi() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Express sever running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

startApi();
