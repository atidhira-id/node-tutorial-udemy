const express = require("express");
const productsController = require("../controllers/admin");

const router = express.Router();

router.get("/", productsController.getProductListPage);

router.get("/add-product", productsController.getAddProductPage);

router.post("/add-product", productsController.postProduct);

module.exports = router;
