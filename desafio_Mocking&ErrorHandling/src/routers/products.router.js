import {Router} from "express";
const router = Router();

import ProductsController from "../controllers/productsController.js";
const productsController = new ProductsController();

router.get("/", productsController.getProducts);
router.get("/:pid", productsController.getProductById);
router.post("/", productsController.addProduct);
router.put("/:pid", productsController.updateProduct);
router.delete("/:pid", productsController.deleteProduct);

export default router;