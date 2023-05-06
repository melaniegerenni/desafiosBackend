import { Router } from "express";
const router = Router();
import CartDBManager from "../dao/DBmanagers/cart.db.manager.js";
const cartManagerDB = new CartDBManager();

router.post("/", async (req, res) => {
  const products = req.body;
  const newCart = await cartManagerDB.addCart(products);
  if (newCart) {
    res.status(200).json({ newCart });
  }
});

router.get("/:cid", async (req, res) => {
  const cid = req.params.cid;
  const cart = await cartManagerDB.getCartById(cid);
  if (cart) {
    const products = cart.products;
    res.status(200).json({ products });
  } else {
    res.status(404).send("Cart not found");
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const newCart = await cartManagerDB.addProduct(cid, pid);
  if (newCart) {
    res.status(202).json(newCart);
  } else {
    res.status(404).send("Cart not found");
  }
});

export default router;
