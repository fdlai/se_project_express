//the items route
const { Router } = require("express");
const router = Router();
const clothingItemModel = require("../models/clothingItem");

//get all clothing items
router.get("/", (req, res) => {
  clothingItemModel
    .find({})
    .populate("owner")
    .then((items) => {
      console.log(items);
      res.status(200).set("Content-Type", "application/json").send(items);
    })
    .catch((err) => {
      const message = `${err} Could not get items.`;
      console.error(message);
      res.status(500).send(message);
    });
});

//add a new clothing item
router.post("/", (req, res) => {
  const { name, weather, imageUrl, owner } = req.body;

  clothingItemModel
    .create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.status(200);
      res.set("Content-Type", "application/json");
      console.log(item);
      res.send(item);
    })
    .catch((err) => {
      const message = `${err} Could not add item.`;
      console.error(message);
      res.status(500).send(message);
    });
});

//delete an item by its id
router.delete("/:itemId", (req, res) => {
  const { itemId } = req.params;

  clothingItemModel
    .findByIdAndRemove(itemId)
    .then((item) => {
      console.log("Deleted", item);
      res.status(200).set("Content-Type", "application/json").send(item);
    })
    .catch((err) => {
      const message = `${err} Could not delete item.`;
      console.error(message);
      res.status(500).send(message);
    });
});

module.exports = router;
