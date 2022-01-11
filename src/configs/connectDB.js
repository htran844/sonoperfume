// connect to database
const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.scyoz.mongodb.net/sonodb?retryWrites=true&w=majority`
    );
    // await mongoose.connect("mongodb://localhost:27017/learnDB");
    console.log("connect db successfully!");
  } catch (error) {
    console.log("connect fail....");
  }
}

connectDB();
