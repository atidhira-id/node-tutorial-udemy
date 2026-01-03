import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.fetchAll();
    res.render("admin/index", {
      products: products,
      docTitle: "All Products",
      path: "/admin",
    });
  } catch (err) {
    console.log(err);
  }
};

export const getAddProductPage = (req, res) => {
  res.render("admin/add-product", {
    docTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

export const getEditProductPage = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.getProductById(productId);
    res.render("admin/add-product", {
      docTitle: "Edit Product",
      path: "/admin/add-product",
      editing: true,
      product: product,
    });
  } catch (err) {
    console.log(err);
  }
};

export const postAddProduct = async (req, res) => {
  const { title, price, description, imageUrl } = req.body;
  const user = req.user;
  try {
    const product = new Product(title, price, description, imageUrl, user._id);
    await product.save();
    res.redirect("/admin");
  } catch (err) {
    console.log(err);
  }
};

export const postEditProduct = async (req, res) => {
  const { title, price, description, imageUrl, id } = req.body;
  try {
    const product = new Product(title, price, description, imageUrl);
    await product.update(id);
    res.redirect("/admin");
  } catch (err) {
    console.log(err);
  }
};

export const deleteProductById = async (req, res) => {
  const { id } = req.body;
  try {
    await Product.deleteProductById(id);
    res.redirect("/admin");
  } catch (err) {
    console.log(err);
  }
};
