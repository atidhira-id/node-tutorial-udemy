import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.fetchAll();
    res.render("shop/index", {
      products: products,
      docTitle: "All Products",
      path: "/",
    });
  } catch (err) {
    console.log(err);
  }
};

export const getProductDetail = async (req, res) => {
  const productId = req.params.productId;
  try {
    const product = await Product.getProductById(productId);
    res.render("shop/product-detail", {
      product: product,
      docTitle: "Products Detail",
    });
  } catch (err) {
    console.log(err);
  }
};

export const getCart = async (req, res) => {
  try {
    const cart = await req.user.getCart();

    res.render("shop/cart", {
      docTitle: "Your Cart",
      path: "/cart",
      products: cart.products,
      total: cart.total,
    });
  } catch (err) {
    console.log(err);
  }
};

export const postProductToCart = async (req, res) => {
  const productId = req.body.productId;
  try {
    const user = req.user;
    const product = await Product.getProductById(productId);
    await user.addToCart(product);
    res.redirect("/cart");
  } catch (err) {
    console.log(err);
  }
};
