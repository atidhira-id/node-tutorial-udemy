const products = require("../data/products");

exports.getShopListPage = (req, res) => {
  res.render("shop", {
    products: products,
    docTitle: "Shop Products",
    path: "/",
  });
};
