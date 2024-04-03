// the items route
const { Router } = require("express");

const router = Router();
const { authorizeRequest } = require("../middlewares/auth");
const {
  getItems,
  addItem,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItems");
const { validateCardBody, validateId } = require("../middlewares/validation");

// get all clothing items
router.get("/", getItems);

// add a new clothing item
router.post("/", authorizeRequest, validateCardBody, addItem);

// delete an item by its id
router.delete("/:itemId", authorizeRequest, validateId, deleteItem);

// like an item by its id
router.put("/:itemId/likes", authorizeRequest, validateId, likeItem);

// unlike an item by its id
router.delete("/:itemId/likes", authorizeRequest, validateId, unlikeItem);

module.exports = router;
