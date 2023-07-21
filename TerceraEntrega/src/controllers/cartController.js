import {userService, cartService, productService, ticketService} from "../services/index.js";

export default class CartController {
    constructor () {
        this.cartService = cartService;
    }

    addCart = async (req, res) => {
        const products = req.body;
        const userId = req.user.user._id;
        const newCart = await this.cartService.addCart(products);
        if (newCart) {
          const cid = newCart._id;
          await userService.addCart(userId, cid);
          res.status(200).json({ newCart });
        }
    };
      
    getCartById = async (req, res) => {
        const cid = req.params.cid;
        const cart = await this.cartService.getCartById(cid);
        if (cart) {
          const products = cart.products;
          res.status(200).render('cart', {products} );
        } else {
          res.status(404).send("Cart not found");
        }
    };
      
    addProduct = async (req, res) => {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const newCart = await this.cartService.addProduct(cid, pid);
        if (newCart) {
          res.status(202).json(newCart);
        } else {
          res.status(404).send("Cart not found");
        }
    };
      
    deleteProduct = async (req, res) => {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const response = await this.cartService.deleteProduct(cid, pid);
        if (response) {
          res.status(202).send("Producto eliminado con éxito");
        }
    };
      
    updateCart = async (req, res) => {
        const cid = req.params.cid;
        const products = req.body;
        const response = await this.cartService.updateCart(cid, products);
        if (response) {
          res.status(202).send("Carrito actualizado!");
        }
    };
      
    updateProduct = async (req, res) => {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const { quantity } = req.body;
        const response = await this.cartService.updateProduct(cid, pid, quantity);
        if (response) {
          res.status(202).send("Producto actualizado!");
        }
    };
      
    deleteProducts  = async (req, res) => {
        const cid = req.params.cid;
        const response = await this.cartService.deleteProducts(cid);
        if (response) {
          res.status(202).send("Productos eliminados del carrito");
        }
    };

    setPurchase = async (req, res) => {
        const cid = req.params.cid;
        const purchaser = req.user.user.email;
        const cart = await this.cartService.getCartById(cid);
        const productsOutStock = [];
        const productsPurchased = [];
        let amount = 0;
        cart.products.forEach(async item => {
          const pid = item.product._id;
          let stock = item.product.stock;
          const qty = item.quantity;
          const price = item.product.price;
          if(stock >= qty) {
            stock = stock - qty;
            amount = amount + (price * qty);
            productsPurchased.push(pid);
            await productService.updateProduct(pid, {stock})
          } else {
            productsOutStock.push(pid);
          }
        });
        await this.cartService.deleteManyProducts(cid, productsPurchased);
        const ticket = await ticketService.createTicket(amount, purchaser);
        const mail = await ticketService.sendConfirmation(purchaser);
        res.status(200).json({productsOutStock});
        
    }
}