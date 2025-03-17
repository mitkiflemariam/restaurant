const express = require("express");
// const PORT = 3000;
const connectDB = require("./db");
const userRoutes = require("./routers/userrouter");
const foodItemRoutes = require("./routers/foodItemRoutes");
const passwordResetRoutes = require("./routers/passwordResetRoutes");
const dotenv = require("dotenv");
const cors = require("cors");
const { Pool } = require("pg");

const swaggerDocs = require("./utility/swagger");

   
dotenv.config();

const app = express();

// Enable CORS for all routes
app.use(
  cors({
    // origin: "http://localhost:5173", // Allow frontend to make requests
    origin: process.env.FRONTEND_URL, // Allow frontend to make requests
    credentials: true, // Allow cookies if needed
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed request methods
  })
);
app.use(express.json());
// Routes
app.use("/api/users", userRoutes);
app.use("/api/food-items", foodItemRoutes);
app.use("/api/password", passwordResetRoutes);

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
// });
async function startApi() {
  try {
    await connectDB();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Express sever running at http://localhost:${PORT}`);
      swaggerDocs(app, PORT);
    });
  } catch (error) {
    console.log(error);
  }
}

startApi();
