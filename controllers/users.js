const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const { handleErrors, CustomError } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

// get all users using route /users
const getUsers = (req, res, next) => {
  userModel
    .find({})
    .then((usersArray) => {
      console.log(usersArray);
      return res.status(200).json(usersArray);
    })
    .catch((err) => {
      const message = `${err} Failed to retrieve users.`;
      handleErrors(err, message, next);
    });
};

// get a single user by id, using route /users/:userId
const getUser = (req, res, next) => {
  const { userId } = req.params;

  userModel
    .findById(userId)
    .orFail()
    .then((user) => {
      console.log(user);
      return res.status(200).json(user);
    })
    .catch((err) => {
      const message = `${err} Could not get user.`;
      handleErrors(err, message, next);
    });
};

// add a new user using route /users
const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => userModel.create({ name, avatar, email, password: hash }))
    .then((newUser) => {
      console.log(newUser);
      // Do not send password in the response
      return res.status(201).json({ name, avatar, email });
    })
    .catch((err) => {
      const message = `${err} Failed to create new user.`;
      handleErrors(err, message, next);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  let user;

  // Check that both email and password fields were in the request body
  if (!email || !password) {
    const err = new CustomError("Please include both email and password.", 400);
    const message = `${err} Could not log in.`;
    handleErrors(err, message, next);
  }

  return userModel
    .findOne({ email })
    .select("+password")
    .orFail(() => {
      // Check email
      const error = new CustomError("Incorrect email or password.", 401);
      throw error;
    })
    .then((data) => {
      user = data;
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      // Check password
      if (!matched) {
        const error = new CustomError("Incorrect email or password.", 401);
        throw error;
      }
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      return res.status(200).json({ token });
    })
    .catch((err) => {
      const message = `${err} Could not log in.`;
      handleErrors(err, message, next);
    });
};

module.exports = { getUsers, getUser, createUser, login };
