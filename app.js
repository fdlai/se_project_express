const express = require("express");
const mongoose = require("mongoose");
const usersRouter = require("./routes/users");
const clothingItemsRouter = require("./routes/clothingItems");
const { CustomError } = require("./utils/errors");
const { PORT = 3001 } = process.env;

const app = express();

mongoose.connect(
  "mongodb://127.0.0.1:27017/wtwr_db",
  (res) => {
    console.log("MongoDB connected", res);
  },
  (err) => {
    console.log("MongoDB error", err);
  },
);

const setJohnMcClaneAsUser = (req, res, next) => {
  //John McClane's user id
  req.user = { _id: "65ba14a62e30213b796614f5" };
  next();
};

app.use(express.json());
app.use("/users", usersRouter);
app.use("/items", setJohnMcClaneAsUser, clothingItemsRouter);
//404 error handler.
//In a previous route handler, calling next(), will trigger this middleware
app.use((req, res, next) => {
  console.log("The 404 error handler has run!!!");
  const err = new CustomError(`Requested resource not found.`, 404);
  next(err);
});
//global error handler.
//In a previous route handler, calling next(err), will trigger this middleware
app.use((error, req, res, next) => {
  console.log("The global error handler has run!!!");
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";
  res.status(error.statusCode).json({ message: error.message });
});

app.listen(PORT, () => {
  console.log("Server is running!");
});

//Test user images:

//Darth Vader
//https://www.wallpapertip.com/wmimgs/249-2495537_darth-vader.jpg

//Aragorn
//https://cdn.staticneo.com/w/lotr/Aragorn.jpg

//John McClane
//https://i.pinimg.com/originals/41/41/3b/41413b84d9d7f88d6e95339e8453a376.jpg

//Forrest Gump
//https://i.imgflip.com/uaysp.jpg

//Test clothing item images:

//Lightsaber
//https://images-na.ssl-images-amazon.com/images/I/315yq7GPqLL._SL500_AC_SS350_.jpg

//Sword
//https://www.actionfiguren-shop.com/out/pictures/generated/product/4/540_340_100/andruil_4.jpg

//Green Shirt
//https://cdnc.lystit.com/photos/riverisland/1b7b5ab2/river-island-green-Dark-Green-Muscle-Fit-Crew-Neck-T-shirt-Dark-Green-Muscle-Fit-Crew-Neck-T-shirt.jpeg
