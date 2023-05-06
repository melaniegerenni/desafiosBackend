import { Router } from "express";
const router = Router();
import ProductDBManager from "../dao/DBmanagers/product.db.manager.js";
const productManagerDB = new ProductDBManager();

router.get("/", async (req, res) => {
  let products = await productManagerDB.getProducts();
  const limit = +req.query.limit;
  if (limit) {
    products = products.slice(0, limit);
    res.json({ products });
    return;
  }
  res.status(200).json({ products });
});

router.get("/:pid", async (req, res) => {
  const pid = req.params.pid;
  const product = await productManagerDB.getProductById(pid);
  if (product) {
    res.status(200).json({ product });
  } else {
    res.status(404).send("<h1>Not found</h1>");
  }
});

router.post("/", async (req, res) => {
  const productNew = req.body;
  const productGenerated = await productManagerDB.addProduct(productNew);
  if (productGenerated) {
    res.status(200).send(`Producto creado con éxito`);
  } else res.status(400).send("Error en la creación del producto");
});

router.put("/:pid", async (req, res) => {
  const pid = req.params.pid;
  const updatedValues = req.body;
  const product = await productManagerDB.updateProduct(pid, updatedValues);
  if (product) {
    res.status(200).json({ product });
  } else {
    res.status(404).send("Product not found");
  }
});

router.delete("/:pid", async (req, res) => {
  const pid = req.params.pid;
  const response = await productManagerDB.deleteProduct(pid);
  console.log(response);
  if (response) {
    res.status(200).send("Producto eliminado con éxito");
  } else {
    res.status(404).send("Product not found");
  }
});

export default router;
