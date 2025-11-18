// responseHelper.js
export const sendResponse = (res, { status = 200, EC = 0, message = "", data = null }) => {
  return res.status(status).json({
    EC,
    message,
    data
  });
};
