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
  const productId = req.params.productId;

  if (!productId) {
    const newProduct = new Product({
      title: "",
      imageUrl: "",
      price: "",
      description: "",
    });

    res.render("admin/add-product", {
      docTitle: "Add Product",
      product: newProduct,
      path: "/admin/add-product",
    });
  } else {
    Product.getProductById(productId, (product) => {
      res.render("admin/add-product", {
        docTitle: "Add Product",
        product: product,
        path: "/admin/add-product",
      });
    });
  }
};

exports.postProduct = (req, res) => {
  const newProduct = new Product(req.body);
  newProduct.save();

  res.redirect("/admin");
};
