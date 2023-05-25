import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import viewsRouter from "./routes/views.router.js";
import chatRouter from "./routes/chat.router.js";
import sessionRouter from "./routes/session.router.js";

const run = (socketServer, app) => {
  app.use("/api/products", productsRouter);
  app.use("/api/carts", cartRouter);

  app.use("/", viewsRouter(socketServer));
  app.use("/chat", chatRouter(socketServer));
  app.use("/sessions", sessionRouter);
};

export default run;