import { Router } from "express";
const router = Router();

import ProductDBManager from "../dao/DBmanagers/product.db.manager.js";
const productManagerDB = new ProductDBManager();

import CartDBManager from "../dao/DBmanagers/cart.db.manager.js";
const cartManagerDB = new CartDBManager();

router.get("/", async (req, res) => {
  const products = await productManagerDB.getProducts();
  res.render("home", { products });
});

router.get("/realtimeproducts", async (req, res) => {
  const products = await productManagerDB.getProducts();
  res.render("realTimeProducts", { products });
});

router.get("/products", async (req, res) => {
  const limit = +req.query.limit || 10;
  const page = +req.query.page || 1;
  const sort = req.query.sort || "";
  const category = req.query.category;
  const query = category ? { category } : {};
  const products = await productManagerDB.getProductsPaginate(
    limit,
    page,
    sort,
    query
  );
  products.prevLink = products.hasPrevPage
    ? `/products?limit=${limit}&page=${products.prevPage}`
    : "";
  products.nextLink = products.hasNextPage
    ? `/products?limit=${limit}&page=${products.nextPage}`
    : "";
  res.render("products", products);
});

router.get("/carts/:cid", async (req, res) => {
  const cid = req.params.cid;
  const cart = await cartManagerDB.getCartById(cid);
  const products = cart.products;

  console.log(products);
  res.render("cart", { products });
});

//export default router;

export default function (io) {
  io.on("connection", (socketClient) => {
    console.log("Nuevo cliente conectado");
    socketClient.on("addProduct", async (data) => {
      const products = await productManagerDB.addProduct(data);
      io.emit("products", products);
    });
    socketClient.on("deleteProduct", async (data) => {
      const products = await productManagerDB.deleteProduct(data);
      io.emit("products", products);
    });
  });
  return router;
}
