import express from "express";
import * as shopController from "../controllers/shop.js";

const router = express.Router();

router.get("/", shopController.getProducts);

router.get("/product/:productId", shopController.getProductDetail);

// router.get("/cart", shopController.getCart);

// router.post("/cart", shopController.postProductToCart);

// router.post("/cart-delete", shopController.deleteProductFromCart);

// router.post("/create-order", shopController.createOrder);

// router.get("/orders", shopController.getOrdersPage);

// router.get("/checkout", shopController.getCheckout);

export default router;
