const express = require("express");
// const PORT = 3000;
const connectDB = require("./db");
const userRoutes = require("./routers/userrouter");
const foodItemRoutes = require("./routers/foodItemRoutes");
const passwordResetRoutes = require("./routers/passwordResetRoutes");
const dotenv = require("dotenv");
const cors = require("cors");
const { Pool } = require("pg");

const promClient = require("prom-client");

const swaggerDocs = require("./utility/swagger");

   
dotenv.config();

const app = express();

// Enable Prometheus metrics collection
const collectDefaultMetrics = promClient.collectDefaultMetrics;
const Registry = promClient.Registry;
const register = new Registry();
collectDefaultMetrics({ register });

// Custom metrics
const httpRequestCounter = new promClient.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status"],
});

const httpRequestDuration = new promClient.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status"],
  buckets: [0.1, 0.3, 0.5, 1, 2, 5], // Buckets for response time
});

// Middleware to track request metrics
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = (Date.now() - start) / 1000; // Convert to seconds
    httpRequestCounter.inc({
      method: req.method,
      route: req.path,
      status: res.statusCode,
    });
    httpRequestDuration.observe(
      {
        method: req.method,
        route: req.path,
        status: res.statusCode,
      },
      duration
    );
  });
  next();
});

// Enable CORS for all routes
app.use(
  cors({
    origin: "http://localhost:5173", // Allow frontend to make requests
    // origin: process.env.FRONTEND_URL, // Allow frontend to make requests
    credentials: true, // Allow cookies if needed
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed request methods
  })
);
app.use(express.json());
// Routes
app.use("/api/users", userRoutes);
app.use("/api/food-items", foodItemRoutes);
app.use("/api/password", passwordResetRoutes);

// Expose metrics endpoint for Prometheus
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});
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
