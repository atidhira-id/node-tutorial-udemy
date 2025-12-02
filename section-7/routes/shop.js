const express = require("express");
const products = require("../data/products");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("shop", {
    products: products,
    docTitle: "Shop Products",
    path: "/",
  });
});

module.exports = router;
