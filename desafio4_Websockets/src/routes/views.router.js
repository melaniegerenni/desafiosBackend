import { Router } from "express";
const router = Router();

import ProductManager from "../classes/product-manager.js";
const productManager = new ProductManager("./src/json/products.json");

router.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("home", { products });
});

router.get("/realtimeproducts", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("realTimeProducts", { products });
});

//export default router;

export default function (io) {
  io.on("connection", (socketClient) => {
    console.log("Nuevo cliente conectado");
    socketClient.on("addProduct", async (data) => {
      const products = await productManager.addProduct(data);
      io.emit("products", products);
    });
    socketClient.on("deleteProduct", async (data) => {
      const products = await productManager.deleteProduct(data);
      io.emit("products", products);
    });
  });
  return router;
}


