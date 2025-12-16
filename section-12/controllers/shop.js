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
