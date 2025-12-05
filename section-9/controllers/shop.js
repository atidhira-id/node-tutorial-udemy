const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      products: products,
      docTitle: "All Products",
      path: "/",
    });
  });
};

exports.getProductDetail = (req, res) => {
  const productId = req.params.productId;

  Product.getProductById(productId, (product) => {
    res.render("shop/product-detail", {
      product: product,
      docTitle: "Products Detail",
    });
  });
};

exports.getCart = (req, res) => {
  res.render("shop/cart", {
    docTitle: "Your Cart",
    path: "/cart",
  });
};

exports.postProductToCart = (req, res) => {
  const productId = req.body.productId;
  Product.getProductById(productId, (product) => {
    const productPrice = parseFloat(product.price);

    Cart.addProduct(productId, productPrice);
  });

  res.redirect("/cart");
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
