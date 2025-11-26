const express = require("express");

const app = express();

app.use("/users", (req, res, next) => {
  console.log("Second middleware");
  res.send("Assignment 5 /users");
});

app.use("/", (req, res, next) => {
  console.log("First middleware");
  res.send("Assignment 5 /");
});

app.listen(3000);
