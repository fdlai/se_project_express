const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const { handleErrors, CustomError } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

// runs on route /users/me
const getCurrentUser = (req, res, next) => {
  const { _id } = req.user;

  userModel
    .findById(_id)
    .orFail()
    .then((user) => {
      console.log(user);
      return res.status(200).json(user);
    })
    .catch((err) => {
      const message = `${err} Could not retrieve user info.`;
      handleErrors(err, message, next);
    });
};

// change name and/or avatar using route /users/me
const updateCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  const { name, avatar } = req.body;
  const updates = {};
  if (name) {
    updates.name = name;
  }
  if (avatar) {
    updates.avatar = avatar;
  }

  userModel
    .findByIdAndUpdate(_id, updates, {
      new: true,
      runValidators: true,
    })
    .orFail()
    .then((user) => {
      console.log(user);
      return res.status(200).json(user);
    })
    .catch((err) => {
      const message = `${err} Failed to update user info.`;
      handleErrors(err, message, next);
    });
};

// add a new user using route /signup
const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  // name and avatar are optional
  const storedUserInfo = { email }; // stored to database
  const sentUserInfo = { email }; // sent to client
  if (name) {
    storedUserInfo.name = name;
    sentUserInfo.name = name;
  }
  if (avatar) {
    storedUserInfo.avatar = avatar;
    sentUserInfo.avatar = avatar;
  }

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      storedUserInfo.password = hash;
      return userModel.create(storedUserInfo);
    })
    .then((newUser) => {
      console.log(newUser);
      // Do not send password in the response
      return res.status(201).json(sentUserInfo);
    })
    .catch((err) => {
      const message = `${err} Failed to create new user.`;
      handleErrors(err, message, next);
    });
};

// send jwt token using route /signin
const login = (req, res, next) => {
  const { email, password } = req.body;
  let user;

  // Check that both email and password fields were in the request body
  if (!email || !password) {
    const err = new CustomError("Please include both email and password.", 400);
    const message = `${err} Could not log in.`;
    handleErrors(err, message, next);
  }

  userModel
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

      return res.status(200).json({
        token,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        _id: user._id,
      });
    })
    .catch((err) => {
      const message = `${err} Could not log in.`;
      handleErrors(err, message, next);
    });
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateCurrentUser,
};
