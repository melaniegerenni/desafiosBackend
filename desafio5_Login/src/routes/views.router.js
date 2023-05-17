import { Router } from "express";
const router = Router();

import ProductDBManager from "../dao/DBmanagers/product.db.manager.js";
const productManagerDB = new ProductDBManager();

import CartDBManager from "../dao/DBmanagers/cart.db.manager.js";
const cartManagerDB = new CartDBManager();

const auth = (req, res, next) => {
  if (req.session.user) {
    return next();
  } else {
    return res.redirect("/sessions/login");
  }
};

router.get("/", auth, async (req, res) => {
  const products = await productManagerDB.getProducts();
  res.render("home", { products });
});

router.get("/realtimeproducts", auth, async (req, res) => {
  const products = await productManagerDB.getProducts();
  res.render("realTimeProducts", { products });
});

router.get("/products", auth, async (req, res) => {
  const {first_name, role} = req.session.user;
  const limit = +req.query.limit || 10;
  const page = +req.query.page || 1;
  const sort = req.query.sort || "";
  const category = req.query.category;
  const price = +req.query.price;
  let query = {};
  if (category) {
    query.category = category;
  }
  if (price) {
    query.price = price;
  }
  const products = await productManagerDB.getProductsPaginate(
    limit,
    page,
    sort,
    query
  );
  const path = `/products?limit=${limit}&page=`;
  products.prevLink = products.hasPrevPage ? path + products.prevPage : "";
  products.nextLink = products.hasNextPage ? path + products.nextPage : "";
  res.render("products", {...products, first_name, role});
});

router.get("/carts/:cid", auth, async (req, res) => {
  const cid = req.params.cid;
  const cart = await cartManagerDB.getCartById(cid);
  const products = cart.products;

  console.log(products);
  res.render("cart", { products });
});

router.get('/profile', auth, (req,res) => {
  const user = req.session.user
  res.render('profile', {user})
})

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
