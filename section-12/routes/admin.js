import express from "express";
import * as adminController from "../controllers/admin.js";

const router = express.Router();

router.get("/", adminController.getProducts);

router.get("/add-product", adminController.getAddProductPage);

router.post("/add-product", adminController.postAddProduct);

router.get("/edit-product/:productId", adminController.getEditProductPage);

router.post("/edit-product", adminController.postEditProduct);

router.post("/delete-product", adminController.deleteProductById);

export default router;
