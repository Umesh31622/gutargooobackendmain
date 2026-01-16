
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const connectDB = require("./utils/db");

// ROUTES
const admin = require("./routes/Admin");
const users = require("./routes/User");
const vendors = require("./routes/Vendor");
const Dynamic = require("./routes/Dynamic");
const section = require("./routes/Section");
const operatorRoutes = require("./routes/operatorRoutes");


// MODELS
const Transaction = require("./models/Transactions");

const app = express();
const PORT = process.env.PORT || 9000;

/* ===============================
   CORS CONFIG (LOCAL + PROD SAFE)
================================ */
const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://gutargooplusbackend.onrender.com"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Postman / server calls
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("CORS not allowed"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/operator", operatorRoutes);
/* ===============================
   ROOT & HEALTH ROUTES
================================ */
app.get("/", (req, res) => {
  res.json({
    status: "GutargooPlus Backend is running 🚀",
    uptime: process.uptime(),
    timestamp: new Date()
  });
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

/* ===============================
   DATABASE CONNECT
================================ */
connectDB();

/* ===============================
   START CRON JOBS (AFTER DB READY)
================================ */
let cronStarted = false;

mongoose.connection.once("open", () => {
  if (cronStarted) return;
  cronStarted = true;

  console.log("✅ DB ready, starting cron jobs");

  require("./cron/autoStartContests");
  require("./cron/withdrawalNotifier");
});

/* ===============================
   API ROUTES
================================ */
app.use("/api/users", users);
app.use("/api/admin", admin);
app.use("/api/vendors", vendors);
app.use("/api/common", Dynamic);
app.use("/api/sections", section);

/* ===============================
   TEST / STATIC FILES
================================ */
app.get("/testing", (req, res) => {
  res.sendFile(path.join(__dirname, "testing.html"));
});

app.get("/testingVideos", (req, res) => {
  res.sendFile(path.join(__dirname, "testingVideos.html"));
});

app.get("/reset-password/:token", (req, res) => {
  res.sendFile(path.join(__dirname, "reset-password.html"));
});

app.get("/ads", (req, res) => {
  res.sendFile(path.join(__dirname, "testingads.html"));
});

/* ===============================
   TRANSACTIONS API
================================ */
app.get("/api/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find({});
    res.status(200).json({
      success: true,
      message: "Transactions fetched successfully",
      data: transactions
    });
  } catch (error) {
    console.error("Transaction error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
});

/* ===============================
   SERVER START
================================ */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
