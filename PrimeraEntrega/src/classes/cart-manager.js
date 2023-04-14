import fs from 'fs';

class CartManager {
    #path

    constructor(path){
        this.#path= path
        this.#createFile()
    }

    #createFile = () => {
        !fs.existsSync(this.#path) &&
          fs.writeFileSync(this.#path, JSON.stringify([]));
    }

    #generateID = async () => {
        const carts = await this.getCarts();
        let id;
        carts.length == 0
          ? (id = 1)
          : (id = carts[carts.length - 1].id + 1);
        return id;
    }

    getCarts = async () => {
        const contenido = await fs.promises.readFile(this.#path, "utf-8");
        let carts = JSON.parse(contenido);
        return carts;
    }

    getCartById = async (id) => {
        const carts = await this.getCarts();
        let findCart = carts.find((cart) => cart.id == id);
        if(findCart) {
          return findCart;
        } else {
          console.log("Not found");
        }
    }

    addCart = async (products) => {
        let carts = await this.getCarts();
        let id = await this.#generateID();
        const newCart = {
            id,
            products
        }
        carts.push(newCart);
        await fs.promises.writeFile(this.#path, JSON.stringify(carts, null, "\t"));
        return newCart;
    }

    addProduct = async (cid, pid) => {
        const newProduct = {product: pid, quantity: 1};
        const carts = await this.getCarts();
        const index = carts.findIndex(cart => cart.id == cid);
        if (index >= 0) {
            const indexProduct = carts[index].products.findIndex(prod => prod.product == pid)
            if (indexProduct >= 0) {
                carts[index].products[indexProduct].quantity += 1;
            } else {
                carts[index].products.push(newProduct);
            }
            await fs.promises.writeFile(this.#path, JSON.stringify(carts, null, "\t"));
            return carts[index];
        } else {
            console.log("Cart not found");
        }
    }
    
}


export default CartManager;