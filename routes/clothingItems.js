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

// get all clothing items
router.get("/", getItems);

// add a new clothing item
router.post("/", authorizeRequest, addItem);

// delete an item by its id
router.delete("/:itemId", authorizeRequest, deleteItem);

// like an item by its id
router.put("/:itemId/likes", authorizeRequest, likeItem);

// unlike an item by its id
router.delete("/:itemId/likes", authorizeRequest, unlikeItem);

module.exports = router;
