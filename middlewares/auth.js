const jwt = require("jsonwebtoken");
const { handleErrors, CustomError } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const authorizeRequest = (req, res, next) => {
  const { authorization } = req.headers;

  // Check that auth is a header and that it begins with Bearer
  if (!authorization || !authorization.startsWith("Bearer ")) {
    const err = new CustomError("Incorrect authorization header.", 401);
    return handleErrors(err, err.message, next);
  }

  const token = authorization.replace("Bearer ", "");

  return jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      const message = `${err}. Access denied.`;
      return handleErrors(err, message, next);
    }
    req.user = payload;
    return next();
  });
};

module.exports = { authorizeRequest };
