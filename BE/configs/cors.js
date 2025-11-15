const cors = require("cors");
const dotenv = require("dotenv")

const corsOptions = {
  origin: process.env.FE_URL,   //"http://localhost:3000"
  credentials: true
};

module.exports = cors(corsOptions);
