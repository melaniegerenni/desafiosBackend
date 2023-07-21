import {Router} from "express";
const router = Router();

import CartController from "../controllers/cartController.js";
const cartController = new CartController();

router.post("/", cartController.addCart);  
router.get("/:cid", cartController.getCartById);  
router.post("/:cid/product/:pid", cartController.addProduct);  
router.delete("/:cid/product/:pid", cartController.deleteProduct);  
router.put("/:cid", cartController.updateCart);  
router.put("/:cid/product/:pid", cartController.updateProduct);  
router.delete("/:cid", cartController.deleteProducts);
router.post("/:cid/purchase", cartController.setPurchase);

export default router;