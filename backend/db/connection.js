const mongoose = require("mongoose");
require("dotenv").config();

const DB_URI = process.env.MONGODB_URL;

async function connectDatabase() {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database");
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
}

mongoose.connection.on("error", console.error.bind(console, "MongoDB connection error:"));
mongoose.connection.once("open", () => {
  console.log("MongoDB connection established");
});

module.exports = { connectDatabase };
