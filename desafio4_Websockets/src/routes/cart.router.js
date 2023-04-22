import { Router } from "express";
const router = Router();
import CartManager from "../classes/cart-manager.js";
const cartManager = new CartManager("./src/json/carts.json");

router.post("/", async (req, res) => {
  const products = req.body;
  const newCart = await cartManager.addCart(products);
  if (newCart) {
    res.status(200).json({ newCart });
  }
});

router.get("/:cid", async (req, res) => {
  const cid = +req.params.cid;
  const cart = await cartManager.getCartById(cid);
  if (cart) {
    const products = cart.products;
    res.status(200).json({ products });
  } else {
    res.status(404).send("Cart not found");
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  const cid = +req.params.cid;
  const pid = +req.params.pid;
  const newCart = await cartManager.addProduct(cid, pid);
  if (newCart) {
    res.status(202).json(newCart);
  } else {
    res.status(404).send("Cart not found");
  }
});

export default router;
