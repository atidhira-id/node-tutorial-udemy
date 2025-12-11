const Product = require("../models/product");

exports.getProductListPage = (req, res) => {
  Product.fetchAll()
    .then(([rows, _]) => {
      res.render("admin/index", {
        products: rows,
        docTitle: "Products List",
        path: "/admin",
      });
    })
    .catch((err) => {
      console.log(err);
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

  Product.getProductById(productId)
    .then(([row, _]) => {
      res.render("admin/add-product", {
        docTitle: "Edit Product",
        product: row[0],
        path: "/admin/edit-product",
        editing: true,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.redirect("/");
    });
};

exports.postProduct = (req, res) => {
  const newProduct = new Product(req.body);
  newProduct
    .save()
    .then((result) => {
      res.redirect("/admin");
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res) => {
  const updatedProduct = new Product(req.body);
  updatedProduct
    .update()
    .then((result) => {
      res.redirect("/admin");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteProductById = (req, res) => {
  const { id } = req.body;
  Product.deleteProductById(id)
    .then((result) => {
      res.redirect("/admin");
    })
    .catch((err) => console.log(err));
};
