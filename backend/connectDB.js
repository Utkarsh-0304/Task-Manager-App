const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("Failed to connect MongoDB", err));
}

module.exports = connectDB;
