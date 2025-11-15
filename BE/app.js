const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const connectDB = require('./configs/db')
const initRoutes = require('./routes/index')

const corsMiddleware = require('./configs/cors')

// Load environment variables
dotenv.config()

// init app by express
const app = express()

const PORT = process.env.PORT || 8000;

// connect mongoose
connectDB()

// config cors
app.use(corsMiddleware)

app.use(express.json())

//route
initRoutes(app)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});