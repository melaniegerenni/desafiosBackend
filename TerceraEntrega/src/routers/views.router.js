import { Router } from "express";
const router = Router();
import { productService } from "../services/index.js";
import ViewsController from "../controllers/viewsController.js";
const viewsController = new ViewsController();

router.get("/", viewsController.renderHome);
router.get("/realtimeproducts", viewsController.renderRealTime);
router.get("/products", viewsController.renderProducts);
router.get("/carts/:cid", viewsController.renderCart);
router.get('/profile', viewsController.renderProfile);

//export default router;

export default function (io) {
  io.on("connection", (socketClient) => {
    console.log("Nuevo cliente conectado");
    socketClient.on("addProduct", async (data) => {
      await productService.addProduct(data);
      const products = await productService.getProducts();
      io.emit("products", products);
    });
    socketClient.on("deleteProduct", async (data) => {
      await productService.deleteProduct(data);
      const products = await productService.getProducts();
      io.emit("products", products);
    });
  });
  return router;
}