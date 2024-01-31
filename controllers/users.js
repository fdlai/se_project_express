const userModel = require("../models/user");

//get all users
const getUsers = (req, res) => {
  userModel
    .find({})
    .then((usersArray) => {
      res.status(200);
      res.set("Content-Type", "application/json");
      console.log(usersArray);
      res.send(usersArray);
    })
    .catch((err) => {
      res.status(500).send(`${err} Failed to retrieve users.`);
    });
};

//get a single user by id
const getUser = (req, res) => {
  const { userId } = req.params;

  userModel
    .findById(userId)
    .then((user) => {
      res.status(200);
      res.set("Content-Type", "application/json");
      console.log(user);
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send(`${err} Could not get user.`);
    });
};

//add a new user
const createUser = (req, res) => {
  const { name, avatar } = req.body;

  userModel
    .create({ name, avatar })
    .then((newUser) => {
      console.log(newUser);
      res.send(newUser);
    })
    .catch((err) => {
      res.status(500).send(`${err} Failed to create new user.`);
    });
};

module.exports = { getUsers, getUser, createUser };
