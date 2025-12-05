const Product = require("../models/product");

exports.getProductListPage = (req, res) => {
  Product.fetchAll((products) => {
    res.render("admin/index", {
      products: products,
      docTitle: "Products List",
      path: "/admin",
    });
  });
};

exports.getAddProductPage = (req, res) => {
  res.render("admin/add-product", {
    docTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.postProduct = (req, res) => {
  const newProduct = new Product(req.body);
  newProduct.save();

  res.redirect("/admin");
};
