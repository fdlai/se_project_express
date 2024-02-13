const clothingItemModel = require("../models/clothingItem");
const { handleErrors } = require("../utils/errors");

// get all items, using route /items
const getItems = (req, res, next) => {
  clothingItemModel
    .find({})
    .populate("owner")
    .then((items) => {
      console.log(items);
      return res.status(200).json(items);
    })
    .catch((err) => {
      const message = `${err} Could not get items.`;
      handleErrors(err, message, next);
    });
};

// add a new item, using route /items
const addItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  clothingItemModel
    .create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      console.log(item);
      return res.status(201).json(item);
    })
    .catch((err) => {
      const message = `${err} Could not add item.`;
      handleErrors(err, message, next);
    });
};

// delete an item by its id, using route /items/:itemId
const deleteItem = (req, res, next) => {
  const { itemId } = req.params;

  clothingItemModel
    .findByIdAndRemove(itemId)
    .orFail()
    .then((item) => {
      console.log(item);
      return res.status(200).json(item);
    })
    .catch((err) => {
      const message = `${err} Could not delete item.`;
      handleErrors(err, message, next);
    });
};

// like an item by its id, using route /items/:itemId/likes
const likeItem = (req, res, next) => {
  const { itemId } = req.params;

  clothingItemModel
    .findByIdAndUpdate(
      itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .orFail()
    .then((item) => {
      console.log(item);
      return res.status(200).json(item);
    })
    .catch((err) => {
      const message = `${err} Could not like item.`;
      handleErrors(err, message, next);
    });
};

// unlike an item by its id, using route /items/:itemId/likes
const unlikeItem = (req, res, next) => {
  const { itemId } = req.params;

  clothingItemModel
    .findByIdAndUpdate(
      itemId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .orFail()
    .then((item) => {
      console.log(item);
      return res.status(200).json(item);
    })
    .catch((err) => {
      const message = `${err} Could not unlike item.`;
      handleErrors(err, message, next);
    });
};

module.exports = { getItems, addItem, deleteItem, likeItem, unlikeItem };
