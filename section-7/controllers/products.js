const products = require("../data/products");

exports.getAddProductPage = (req, res) => {
  res.render("add-product", {
    docTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.postProduct = (req, res) => {
  products.push({ title: req.body.title });
  res.redirect("/");
};
