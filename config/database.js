const mongoose = require("mongoose");

const connect = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/tour-booking";
    await mongoose.connect(mongoUri);
    console.log(">>> [MongoDB] Connected successfully to database!");
  } catch (error) {
    console.error(">>> [MongoDB] Connection error:", error.message);
    process.exit(1);
  }
};

module.exports = {
  connect,
};
