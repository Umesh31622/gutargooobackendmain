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
  "https://gutargooplusbackend.onrender.com",
  "https://gutargoooplus.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
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

/* ===============================
   HEALTH ROUTES
================================ */
app.get("/", (req, res) => {
  res.status(200).json({
    status: "GutargooPlus Backend Running 🚀",
    timestamp: new Date(),
    uptime: process.uptime()
  });
});

app.get("/health", (req, res) => res.status(200).send("OK"));

/* ===============================
   CONNECT DATABASE
================================ */
connectDB();

/* ===============================
   CRON JOBS START (AFTER DB)
================================ */
let cronStarted = false;

mongoose.connection.once("open", () => {
  if (cronStarted) return;
  cronStarted = true;
  console.log("✅ MongoDB Connected — Starting Cron");

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
app.use("/api/operator", operatorRoutes);

/* ===============================
   TRANSACTIONS API
================================ */
app.get("/api/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find({});
    res.status(200).json({ success: true, data: transactions });
  } catch (error) {
    console.error("Transaction Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

/* ===============================
   STATIC TEST FILES
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
   START SERVER
================================ */
app.listen(PORT, () => {
  console.log(`🚀 Server Running on PORT: ${PORT}`);
});
