const express = require("express");
const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/", shopController.getProducts);

router.get("/product/:productId", shopController.getProductDetail);

router.get("/cart", shopController.getCart);

router.post("/cart", shopController.postProductToCart);

router.get("/orders", shopController.getOrders);

router.get("/checkout", shopController.getCheckout);

module.exports = router;
