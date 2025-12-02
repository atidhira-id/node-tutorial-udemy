const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    docTitle: "Homepage",
    path: "/",
  });
});

const users = require("../data/users");
router.get("/users", (req, res) => {
  res.render("users", {
    users: users,
    docTitle: "Homepage",
    path: "/users",
  });
});

router.post("/users", (req, res) => {
  const name = req.body.name;

  users.push({ name: name });
  res.redirect("/users");
});

module.exports = router;
