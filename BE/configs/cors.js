import cors from "cors";
import dotenv from "dotenv";

dotenv.config()

const corsOptions = {
  origin: process.env.FE_URL,   //"http://localhost:3000"
  credentials: true
};

export default cors(corsOptions);
