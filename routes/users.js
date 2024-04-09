// the users route
const { Router } = require("express");
const { getCurrentUser, updateCurrentUser } = require("../controllers/users");
const { authorizeRequest } = require("../middlewares/auth");
const { validateUpdateUserBody } = require("../middlewares/validation");

const router = Router();

// get user info of the current logged in user
router.get("/me", authorizeRequest, getCurrentUser);

// update user info for the currently logged in user
router.patch(
  "/me",
  authorizeRequest,
  validateUpdateUserBody,
  updateCurrentUser,
);

module.exports = router;
