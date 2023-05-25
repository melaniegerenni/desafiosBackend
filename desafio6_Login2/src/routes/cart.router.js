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

router.delete("/:cid/product/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const response = await cartManagerDB.deleteProduct(cid, pid);
  if (response) {
    res.status(202).send("Producto eliminado con éxito");
  }
});

router.put("/:cid", async (req, res) => {
  const cid = req.params.cid;
  const products = req.body;
  const response = await cartManagerDB.updateCart(cid, products);
  if (response) {
    res.status(202).send("Carrito actualizado!");
  }
});

router.put("/:cid/product/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const { quantity } = req.body;
  const response = await cartManagerDB.updateProduct(cid, pid, quantity);
  if (response) {
    res.status(202).send("Producto actualizado!");
  }
});

router.delete("/:cid", async (req, res) => {
  const cid = req.params.cid;
  const response = await cartManagerDB.deleteProducts(cid);
  if (response) {
    res.status(202).send("Productos eliminados del carrito");
  }
});

export default router;
