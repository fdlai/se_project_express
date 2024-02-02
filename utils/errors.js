class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

const handleErrors = (err, message, next) => {
  console.error(message);
  if (err.name === "ValidationError") {
    const error = new CustomError(err.message, 400);
    return next(error);
  }
  const error = new CustomError(message);
  return next(error);
};

module.exports = { handleErrors, CustomError };
