const express = require("express");
const productsController = require("../controllers/admin");

const router = express.Router();

router.get("/", productsController.getProductListPage);

router.get("/add-product", productsController.getAddProductPage);

router.post("/add-product", productsController.postProduct);

router.get("/edit-product/:productId", productsController.getEditProductPage);

router.post("/edit-product", productsController.postEditProduct);

router.post("/delete-product", productsController.deleteProductById);

module.exports = router;
