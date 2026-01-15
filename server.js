// // const express = require('express');
// // const MongoStore = require('connect-mongo'); // Add this package
// // const app = express();
// // const db = require('./utils/db')
// // const cors = require("cors");
// // const login= require("./routes/login");
// // const session = require('express-session');
// // const admin = require("./routes/Admin");
// // const users = require("./routes/User");
// // const path = require('path');
// // const vendors = require("./routes/Vendor")
// // const contest = require("./routes/Contest")
// // require('dotenv').config()
// // const PORT = process.env.PORT || 6000;
// // const Transaction = require('./models/Transactions');
// // const Dynmaic = require("./routes/Dynamic")
// // const section = require("./routes/Section")
// // require('./cron/autoStartContests'); // Adjust path as needed
// // require('dotenv').config()
// // db();
// // app.use(cors({
// //   origin: true,
// //   credentials: true,
// //   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS','PATCH'],
// //   allowedHeaders: ['Content-Type', 'Authorization']
// // }));

// // app.use(express.json());
// // let ejs = require('ejs');

// // app.use(express.urlencoded({ extended: true }));
// // app.listen(PORT,()=>{
// //     console.log(`Server started at ${PORT}`)
// //  })
// // // Configure session storage with MongoDB

// // app.get("/testingVideos", (req, res) => {
// // res.sendFile(__dirname + "/testingVideos.html");
// // })
// // app.get("/testingpassword", (req, res) => {
// // res.sendFile(__dirname + "/reset-password.html");
// // })

// //   app.get("/Admintransactions", (req, res) => {
// //     res.sendFile(__dirname + "/payementAdmin.html");
// //   })

// //   app.get("/users", (req, res) => {
// //     res.sendFile(__dirname + "/testinguser.html");
// //   })
// //   app.get("/continuewatching", (req, res) => {
// //     res.sendFile(__dirname + "/testingconitnueWatching.html");
// //   })
 
// //   // Serve the test HTML file
// //   app.get("/testing", (req, res) => {
// //     res.sendFile(__dirname + "/testing.html");
// //   })
// //   app.get("/testingscreens", (req, res) => {
// //     res.sendFile(__dirname + "/testingscreens.html");
// //   })
// //     // Serve the test HTML file
// //     app.get("/testingDevice", (req, res) => {
// //       res.sendFile(__dirname + "/api-tester.html");
// //     })
// // app.use("/api/users",users)
// // app.use("/api/admin",admin);
// // app.use("/api/vendors",vendors);
// // app.use("/api/common",Dynmaic );
// // // app.use("/api/contest",contest);
// // app.use("/api/sections",section);
// // // app.use("/api/auth",vendors);
// // app.get('/session', (req, res) => {
// //     res.json({ sessionId: req.sessionID });
// // });
// // //  // Serve the test HTML file
// //  app.get("/testingpay", (req, res) => {
// //   res.sendFile(__dirname + "/testingVideos.html");
// // })
// // //adtesting
// // app.get("/testingADS", (req, res) => {
// //   res.sendFile(__dirname + "/adtesting.html");
// // })
// // // addashboard
// // // app.get("/ads", (req, res) => {
// // //   res.sendFile(__dirname + "/addashboard.html");
// // // })
// // //testingads
// // app.get("/ads", (req, res) => {
// //   res.sendFile(__dirname + "/testingads.html");
// // })
// // // Render reset-password.html
// // app.get('/reset-password/:token', (req, res) => {
// //   res.sendFile(path.join(__dirname, 'reset-password.html'));
// // });
// // // video-view-tracker
// // // Render reset-password.html
// // app.get('/viewstesting', (req, res) => {
// //   res.sendFile(path.join(__dirname, 'video-view-tracker.html'));
// // });
// // db().then(function (db) {
// //     console.log(`Db connnected`)
// // })
// // // for notificaiotns
// // require('./cron/withdrawalNotifier');

// // // GET all transactions
// // app.get('/api/transactions', async (req, res) => {
// //   try {
// //     const transactions = await Transaction.find({});
// //     res.status(200).json({
// //       success: true,
// //       message: 'Transactions fetched successfully',
// //       data: transactions
// //     });
// //   } catch (error) {
// //     console.error('Error fetching transactions:', error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Internal Server Error',
// //       error: error.message
// //     });
// //   }
// // });
// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const path = require("path");

// const connectDB = require("./utils/db");

// // ROUTES
// const admin = require("./routes/Admin");
// const users = require("./routes/User");
// const vendors = require("./routes/Vendor");
// const Dynmaic = require("./routes/Dynamic");
// const section = require("./routes/Section");

// // MODELS
// const Transaction = require("./models/Transactions");

// const app = express();
// const PORT = process.env.PORT || 10000;

// /* ===============================
//    MIDDLEWARES
// ================================ */
// app.use(cors({
//   origin: true,
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// /* ===============================
//    DATABASE CONNECT
// ================================ */
// connectDB();

// /* ===============================
//    START CRON JOBS AFTER DB READY
// ================================ */
// mongoose.connection.once("open", () => {
//   console.log("✅ DB ready, starting cron jobs");

//   require("./cron/autoStartContests");
//   require("./cron/withdrawalNotifier");
// });

// /* ===============================
//    ROUTES
// ================================ */
// app.use("/api/users", users);
// app.use("/api/admin", admin);
// app.use("/api/vendors", vendors);
// app.use("/api/common", Dynmaic);
// app.use("/api/sections", section);

// /* ===============================
//    TEST HTML FILES
// ================================ */
// app.get("/testing", (req, res) => {
//   res.sendFile(path.join(__dirname, "testing.html"));
// });

// app.get("/testingVideos", (req, res) => {
//   res.sendFile(path.join(__dirname, "testingVideos.html"));
// });

// app.get("/reset-password/:token", (req, res) => {
//   res.sendFile(path.join(__dirname, "reset-password.html"));
// });

// app.get("/ads", (req, res) => {
//   res.sendFile(path.join(__dirname, "testingads.html"));
// });

// /* ===============================
//    TRANSACTIONS API
// ================================ */
// app.get("/api/transactions", async (req, res) => {
//   try {
//     const transactions = await Transaction.find({});
//     res.status(200).json({
//       success: true,
//       message: "Transactions fetched successfully",
//       data: transactions,
//     });
//   } catch (error) {
//     console.error("Transaction error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// });

// /* ===============================
//    SERVER START
// ================================ */
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });
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
