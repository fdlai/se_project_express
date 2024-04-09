const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const { errors } = require("celebrate");
const limiter = require("./utils/rate-limit-config");
const usersRouter = require("./routes/users");
const clothingItemsRouter = require("./routes/clothingItems");
const { CustomError } = require("./utils/errors");
const { createUser, login } = require("./controllers/users");
const { validateUserBody, validateLogin } = require("./middlewares/validation");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const { PORT = 3001 } = process.env;

const app = express();

mongoose.connect(
  "mongodb://127.0.0.1:27017/wtwr_db",
  (res) => {
    console.log("MongoDB connected", res);
  },
  (err) => {
    console.log("MongoDB error", err);
  },
);

app.use(limiter); // 200 requests per 15 minutes
app.use(cors());
app.use(helmet());
app.use(express.json());

// log requests and save them to a file with winston
app.use(requestLogger);

// test server crash
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.post("/signup", validateUserBody, createUser);
app.post("/signin", validateLogin, login);

app.use("/users", usersRouter);
app.use("/items", clothingItemsRouter);

// runs if no other endpoints are requested
app.use((req, res, next) => {
  const err = new CustomError(`Requested resource not found.`, 404);
  return next(err);
});
// save error logs to a file
app.use(errorLogger);
// celebrate error handler
app.use(errors());
// global error handler.
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({ message: error.message });
  return next();
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
