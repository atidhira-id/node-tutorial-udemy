const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.render("shop/index", {
      products: products,
      docTitle: "All Products",
      path: "/",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getProductDetail = async (req, res) => {
  const productId = req.params.productId;
  try {
    const product = await Product.findByPk(productId);
    res.render("shop/product-detail", {
      product: product,
      docTitle: "Products Detail",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await user.getCart();
    const products = await cart.getProducts();

    res.render("shop/cart", {
      docTitle: "Your Cart",
      path: "/cart",
      products: products,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.postProductToCart = async (req, res) => {
  const productId = req.body.productId;
  try {
    const cart = await req.user.getCart();
    const productInCart = await cart.getProducts({ where: { id: productId } });

    if (productInCart) {
      const product =
        productInCart.length >= 1 ? productInCart[0] : productInCart;
    }

    res.redirect("/cart");
  } catch (err) {
    console.log(err);
  }
};

exports.deleteProductFromCart = (req, res) => {
  const { productId, productPrice } = req.body;

  Cart.deleteProduct(productId, productPrice);

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
