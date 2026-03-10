const logger = require("../utils/logger");

function errorHandler(err, req, res, next) {
  logger.error(err.message);

  const status = err.status || 500;

  res.status(status).json({
    error: err.message || "Internal server error",
    status
  });
}

module.exports = errorHandler;