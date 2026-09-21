const express = require("express");
const cors = require("cors");
require("dotenv").config();

const database = require("./config/database");
const routes = require("./routes/index.route");

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to Database
database.connect();

// Global Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check API
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Tour Booking Backend API Service is running 🚀",
    timestamp: new Date().toISOString(),
  });
});

// Mount Application Routes
routes(app);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "API Route Not Found",
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Internal Server Error:", err.stack);
  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
