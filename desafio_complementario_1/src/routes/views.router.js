import { Router } from "express";
const router = Router();

import ProductManager from "../dao/FSmanagers/product.manager.js";
const productManager = new ProductManager("./src/json/products.json");

import ProductDBManager from "../dao/DBmanagers/product.db.manager.js";
const productManagerDB = new ProductDBManager();

router.get("/", async (req, res) => {
  const products = await productManagerDB.getProducts();
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
