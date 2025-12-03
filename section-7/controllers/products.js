const Product = require("../models/product");

exports.getAddProductPage = (req, res) => {
  res.render("add-product", {
    docTitle: "Add Product",
    path: "/add-product",
  });
};

exports.postProduct = (req, res) => {
  const newProduct = new Product(req.body.title);
  newProduct.save();

  res.redirect("/");
};

exports.getProductListPage = (req, res) => {
  Product.fetchAll((products) => {
    res.render("productList", {
      products: products,
      docTitle: "Products List",
      path: "/",
    });
  });
};
