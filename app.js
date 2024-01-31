const express = require("express");
const mongoose = require("mongoose");
const usersRouter = require("./routes/users");
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
app.use(express.json());
app.use("/users", usersRouter);

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
