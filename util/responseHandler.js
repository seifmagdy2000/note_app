const sendSuccessResponse = (res, data, statusCode = 200) => {
  res.status(statusCode).json({ success: true, data });
};

const sendErrorResponse = (res, message, statusCode = 500) => {
  res.status(statusCode).json({ success: false, message });
};

const renderView = (res, view, data = {}) => {
  res.status(200).render(view, data);
};

module.exports = { sendSuccessResponse, sendErrorResponse, renderView };
