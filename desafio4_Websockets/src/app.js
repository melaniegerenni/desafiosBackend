import express from "express";
import handlebars from 'express-handlebars';
import __dirname from "./utils.js";
import {Server} from "socket.io";
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import viewsRouter from "./routes/views.router.js";
import ProductManager from "./classes/product-manager.js";
const productManager = new ProductManager("./src/json/products.json");

const app = express();
const httpServer = app.listen(8080, () => console.log("Server Up"));
const socketServer = new Server(httpServer);

app.use(express.json());
app.engine('handlebars', handlebars.engine())
app.set('views',__dirname+'/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname+'/public'))

app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
//app.use("/", viewsRouter);
app.use("/", viewsRouter(socketServer));


/* socketServer.on('connection', (socketClient) => {
    console.log("Nuevo cliente conectado");
    socketClient.on("addProduct", async (data) => {
        console.log(data);
        const products = await productManager.addProduct(data);
        console.log(products);
        socketServer.emit("products", products);
    })
    socketClient.on("deleteProduct", async (data) => {
        const products = await productManager.deleteProduct(data);
        console.log(products);
        socketServer.emit("products", products);
    })
}) */

