import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./configs/db.js";
import initRoutes from "./routes/index.js";
import corsMiddleware from "./configs/cors.js";

// Load environment variables
dotenv.config();

// init app by express
const app = express();

const PORT = process.env.PORT || 8000;

// connect mongoose
connectDB();

// config cors
app.use(corsMiddleware);

app.use(express.json());

//route
initRoutes(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
