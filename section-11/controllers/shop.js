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
    const cart = await req.user.getCart();
    const products = await cart.getProducts();
    const total = products.reduce((acc, curr) => {
      const quantity = curr.cartItem.quantity;
      const price = curr.price;

      return acc + quantity * price;
    }, 0);

    res.render("shop/cart", {
      docTitle: "Your Cart",
      path: "/cart",
      products: products,
      total: total,
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
    console.log(productInCart);

    if (productInCart.length) {
      const product = productInCart[0];

      const newQuantity = product.cartItem.quantity + 1;
      await cart.addProduct(product, { through: { quantity: newQuantity } });
    } else {
      const product = await Product.findByPk(productId);
      await cart.addProduct(product, { through: { quantity: 1 } });
    }

    res.redirect("/cart");
  } catch (err) {
    console.log(err);
  }
};

exports.deleteProductFromCart = async (req, res) => {
  const { productId } = req.body;
  try {
    const cart = await req.user.getCart();
    const products = await cart.getProducts({ where: { id: productId } });
    const product = products[0];
    await product.cartItem.destroy();

    res.redirect("/cart");
  } catch (err) {
    console.log(err);
  }
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
