import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import { Server } from "socket.io";
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import viewsRouter from "./routes/views.router.js";
import chatRouter from "./routes/chat.router.js";
import mongoose from "mongoose";

const app = express();
let socketServer;

mongoose.set("strictQuery", false);
try {
  await mongoose.connect(
    "mongodb+srv://mgerenni:qVlZ2M76cS1Aparf@ecommerce.z87a8ms.mongodb.net/ecommerce"
  );
  console.log("BD conectada!");
  const httpServer = app.listen(8080, () => console.log("Server Up"));
  socketServer = new Server(httpServer);
} catch (error) {
  console.log("Error al conectarse a la BD");
}

app.use(express.json());
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter(socketServer));
app.use("/chat", chatRouter(socketServer));
