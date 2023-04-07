import express from 'express';
import ProductManager from './product-manager.js';
const productManager = new ProductManager('./products.json');

const app = express();

app.get('/', (req, res) => {
    console.log("Recibí una petición...");
    res.send("Hola Mundo!")
})

app.get('/products', async (req, res) => {
    let products = await productManager.getProducts();
    const limit = req.query.limit;
    if(limit){
        products = products.filter(item => item.id <= limit);
        res.send({products});
        return;
    }
    res.status(200).send({products});
})

app.get('/products/:pid', async (req, res) => {
    const pid = req.params.pid;
    const product = await productManager.getProducById(pid);
    if(product){
        res.status(200).send({product})
    } else {
        res.status(404).send("<h1>Not found</h1>")
    }
})

app.listen(8080, () => console.log("Server up"));