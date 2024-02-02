// the items route
const { Router } = require("express");

const router = Router();
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
router.post("/", addItem);

// delete an item by its id
router.delete("/:itemId", deleteItem);

// like an item by its id
router.put("/:itemId/likes", likeItem);

// unlike an item by its id
router.delete("/:itemId/likes", unlikeItem);

module.exports = router;
