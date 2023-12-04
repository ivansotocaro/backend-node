const { StatusCodes } = require("http-status-codes");

exports.success = (req, res, message = "", status = StatusCodes.OK) => {
  res.status(status).send({
    error: false,
    status,
    body: message,
  });
};

exports.error = (
  req,
  res,
  message = "Internal server error",
  status = StatusCodes.INTERNAL_SERVER_ERROR
) => {
  res.status(status).send({
    error: true,
    status,
    body: message,
  });
};
