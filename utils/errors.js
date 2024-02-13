class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

const handleErrors = (err, message, next) => {
  console.error(message);
  if (err.code === 11000) {
    const error = new CustomError("Email address already in use.", 400);
    return next(error);
  }
  if (err.name === "DocumentNotFoundError") {
    const error = new CustomError(err.message, 404);
    return next(error);
  }
  if (err.name === "ValidationError" || err.name === "CastError") {
    const error = new CustomError(err.message, 400);
    return next(error);
  }
  if (err.name === "JsonWebTokenError") {
    const error = new CustomError(err.message, 401);
    return next(error);
  }
  const error = new CustomError(message, err.statusCode);
  return next(error);
};

module.exports = { handleErrors, CustomError };
