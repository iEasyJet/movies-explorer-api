const { ERR_SERVER } = require('../utils/constants');

const errorHandler = ((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? ERR_SERVER
        : message,
    });
  console.log(err);
  next();
});

module.exports = errorHandler;
