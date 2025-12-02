const express = require("express");
const products = require("../data/products");

const router = express.Router();

router.get("/add-product", (req, res) => {
  res.render("add-product", {
    docTitle: "Add Product",
    path: "/admin/add-product",
  });
});

router.post("/add-product", (req, res) => {
  products.push({ title: req.body.title });
  res.redirect("/");
});

module.exports = router;
