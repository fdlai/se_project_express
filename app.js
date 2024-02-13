const express = require("express");
const mongoose = require("mongoose");
const usersRouter = require("./routes/users");
const clothingItemsRouter = require("./routes/clothingItems");
const { CustomError } = require("./utils/errors");
const { createUser, login } = require("./controllers/users");
const { authorizeRequest } = require("./middlewares/auth");

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

const setJohnMcClaneAsUser = (req, res, next) => {
  // John McClane's user id
  req.user = { _id: "65ba14a62e30213b796614f5" };
  return next();
};

app.use(express.json());

app.post("/signup", createUser);
app.post("/signin", login);

app.use("/users", usersRouter);
app.use("/items", setJohnMcClaneAsUser, authorizeRequest, clothingItemsRouter);

// runs if no other endpoints are requested
app.use((req, res, next) => {
  const err = new CustomError(`Requested resource not found.`, 404);
  return next(err);
});
// global error handler.
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({ message: error.message });
  return next();
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
