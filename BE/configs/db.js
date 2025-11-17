const mongoose = require("mongoose")

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB)
    console.log("CONNECTED TO DB")
  } catch (err) {
    console.error("Error connecting to DB:", err)
  }
}

module.exports = connectDB
