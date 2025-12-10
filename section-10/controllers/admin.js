const Product = require("../models/product");
const Cart = require("../models/cart");

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
    editing: false,
  });
};

exports.getEditProductPage = (req, res) => {
  const productId = req.params.productId;

  Product.getProductById(productId, (product) => {
    if (!product) {
      return res.redirect("/");
    }

    res.render("admin/add-product", {
      docTitle: "Edit Product",
      product: product,
      path: "/admin/edit-product",
      editing: true,
    });
  });
};

exports.postProduct = (req, res) => {
  const newProduct = new Product(req.body);
  newProduct.save();

  res.redirect("/admin");
};

exports.postEditProduct = (req, res) => {
  const updatedProduct = new Product(req.body);
  updatedProduct.save();

  res.redirect("/admin");
};

exports.deleteProductById = (req, res) => {
  const { id } = req.body;
  Product.deleteProductById(id, (response) => {
    console.log(response.message);
    res.redirect("/admin");
  });
};
