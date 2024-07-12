const cors = require("cors");
const express = require("express");
require("dotenv").config();
const { connectDatabase } = require("./db/connection.js");
const userRoute = require("./routes/userRoute.js");
const transactionRoute = require("./routes/transactionRoute.js");

const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());

connectDatabase();

const corsOptions = {
  origin: ["https://fin-z-app.vercel.app", "http://localhost:5173"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],  // Corrected here
  credentials: true,
};

app.use(cors(corsOptions));

// Middleware for setting headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

// Register routes
app.use("/api/users", userRoute); // Ensure this is correctly set
app.use("/api/transactions", transactionRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello world!");
});
