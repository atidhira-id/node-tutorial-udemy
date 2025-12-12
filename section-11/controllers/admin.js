const Product = require("../models/product");
const User = require("../models/user");

exports.getProductListPage = async (req, res) => {
  try {
    const products = await req.user.getProducts();
    res.render("admin/index", {
      products: products,
      docTitle: "Products List",
      path: "/admin",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getAddProductPage = (req, res) => {
  res.render("admin/add-product", {
    docTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.getEditProductPage = async (req, res) => {
  const productId = req.params.productId;

  try {
    const product = await req.user.getProducts({ where: { id: productId } });
    res.render("admin/add-product", {
      docTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: true,
      product: product[0],
    });
  } catch (err) {
    console.log(err);
  }
};

exports.postProduct = async (req, res) => {
  const { title, imageUrl, price, description } = req.body;

  try {
    const product = await req.user.createProduct({
      title: title,
      imageUrl: imageUrl,
      price: price,
      description: description,
    });
    console.log(`Product ${product.title} created`);
    res.redirect("/admin");
  } catch (err) {
    console.log(err);
  }
};

exports.postEditProduct = async (req, res) => {
  const { title, imageUrl, price, description, id } = req.body;
  try {
    const product = await Product.findByPk(id);

    await product.update({
      title: title,
      imageUrl: imageUrl,
      price: price,
      description: description,
    });
    await product.save();
    res.redirect("/admin");
  } catch (err) {
    console.log(err);
  }
};

exports.deleteProductById = async (req, res) => {
  const { id } = req.body;
  try {
    const product = await Product.findByPk(id);
    await product.destroy();
    res.redirect("/admin");
  } catch (err) {
    console.log(err);
  }
};
