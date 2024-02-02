const userModel = require("../models/user");
const { CustomError, handleErrors } = require("../utils/errors");

//get all users using route /users
const getUsers = (req, res) => {
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

//get a single user by id, using route /users/:userId
const getUser = (req, res, next) => {
  const { userId } = req.params;

  userModel
    .findById(userId)
    .orFail(() => {
      const error = new CustomError("User ID not found", 404);
      return next(error);
    })
    .then((user) => {
      console.log(user);
      return res.status(200).json(user);
    })
    .catch((err) => {
      const message = `${err} Could not get user.`;
      handleErrors(err, message, next);
    });
};

//add a new user using route /users
const createUser = (req, res, next) => {
  const { name, avatar } = req.body;

  userModel
    .create({ name, avatar })
    .then((newUser) => {
      console.log(newUser);
      res.status(200).json(newUser);
    })
    .catch((err) => {
      const message = `${err} Failed to create new user.`;
      handleErrors(err, message, next);
    });
};

module.exports = { getUsers, getUser, createUser };
