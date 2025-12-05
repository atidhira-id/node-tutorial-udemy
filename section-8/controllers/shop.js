const Product = require("../models/product");

exports.getProducts = (req, res) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      products: products,
      docTitle: "All Products",
      path: "/",
    });
  });
};

exports.getCart = (req, res) => {
  res.render("shop/cart", {
    docTitle: "Your Cart",
    path: "/cart",
  });
};

exports.getOrders = (req, res) => {
  res.render("shop/orders", {
    docTitle: "Your Orders",
    path: "/orders",
  });
};

exports.getCheckout = (req, res) => {
  res.render("shop/checkout", {
    docTitle: "Checkout",
    path: "/checkout",
  });
};
