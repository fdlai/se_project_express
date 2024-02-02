// the users route
const { Router } = require("express");

const router = Router();
const { getUsers, getUser, createUser } = require("../controllers/users");

// get all users
router.get("/", getUsers);

// get a single user by id
router.get("/:userId", getUser);

// add a new user
router.post("/", createUser);

module.exports = router;
