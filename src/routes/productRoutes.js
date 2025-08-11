import express from "express";
import { getProducts, createProduct, getProductById,updateProduct,deleteProduct } from "../controllers/productsController.js";
import { validateProduct } from "../middlewares/validateProduct.js";
const router = express.Router();

router.get("/getProducts", getProducts);
router.post("/createProduct", validateProduct, createProduct);
router.get("/getProduct/:id", getProductById);
router.put("/updateProduct/:id", validateProduct, updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);
export default router;