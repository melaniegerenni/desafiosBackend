class ProductManager {
  #products;

  constructor() {
    this.#products = [];
  }

  #generateID = () => {
    let id
    if (this.#products.length === 0) id = 1
    else id = this.#products[this.#products.length-1].id + 1
    return id
  }

  getProducts = () => {
    return this.#products;
  };

  getProducById = (id) => {
    let findProduct = this.#products.find(prod => prod.id === id);
    if (findProduct) console.log("El producto es: ", findProduct)
    else console.log("Not found");
  }

  addProduct = (title, description, price, thumbnail, code, stock) => {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Incomplete data");
      return;
    }

    let codeRepeat = this.#products.some((item) => item.code === code);
    if (!codeRepeat) {
      let id = this.#generateID();  
      let newProduct = { id, title, description, price, thumbnail, code, stock };
      this.#products.push(newProduct);
    } else {
      console.log(`The code ${code} is repeated`);
    }
  };
}

const productManager = new ProductManager();

//pruebas
productManager.addProduct("Zapatos", "Zapatos de charol", 5000, "/", 1234, 40);
productManager.addProduct("Zapatos", "Zapatos de gamuza", 5000, "/", 1234, 30);
productManager.addProduct("Cartera", "Cartera ecocuero", 4000, "/", 1222, 25);
productManager.addProduct("Sombrero", "Sombrero de playa", 3500, "/", 1222);

console.log(productManager.getProducts());

productManager.getProducById(1);
productManager.getProducById(5);
