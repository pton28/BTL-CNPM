// responseHelper.js
const sendResponse = (res, { status = 200, EC = 0, message = "", data = null }) => {
  return res.status(status).json({
    EC,   // 0/-1
    message,   // mô tả ngắn
    data       // object hoặc array
  });
};

module.exports = { sendResponse };
