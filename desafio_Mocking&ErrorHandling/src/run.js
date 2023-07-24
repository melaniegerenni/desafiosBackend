import productsRouter from "./routers/products.router.js";
import cartRouter from "./routers/cart.router.js";
import viewsRouter from "./routers/views.router.js";
import chatRouter from "./routers/chat.router.js";
import sessionRouter from "./routers/sessions.router.js";
import mockRouter from "./routers/mock.router.js";
import { passportCall, handlePolicies } from "./utils.js";
import errorHandler from "./middlewares/error.middleware.js"

const run = (socketServer, app) => {
  app.use(errorHandler);
  app.use("/api/products", passportCall('current'), handlePolicies(["USER"]), productsRouter);
  app.use("/api/carts", passportCall('current'), handlePolicies(["USER"]), cartRouter);
  app.use("/api/sessions", sessionRouter);

  app.use("/chat", passportCall('current'), handlePolicies(["USER"]), chatRouter(socketServer));
  app.use("/mockingproducts", mockRouter)
  app.use("/", passportCall('current'), viewsRouter(socketServer));
  
};

export default run;