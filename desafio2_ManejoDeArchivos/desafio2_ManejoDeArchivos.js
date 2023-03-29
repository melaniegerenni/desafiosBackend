import fs from "fs";

class ProductManager {
  #path;

  constructor(path) {
    this.#path = path;
    this.#createFile();
  }

  #createFile = () => {
    !fs.existsSync(this.#path) &&
      fs.writeFileSync(this.#path, JSON.stringify([]));
  };

  #generateID = () => {
    const productos = this.getProducts();
    let id;
    productos.length == 0
      ? (id = 1)
      : (id = productos[productos.length - 1].id + 1);
    return id;
  };

  getProducts = () => {
    const contenido = fs.readFileSync(this.#path, "utf-8");
    let productos = JSON.parse(contenido);
    return productos;
  };

  getProducById = (id) => {
    const productos = this.getProducts();
    let findProduct = productos.find((prod) => prod.id === id);
    findProduct
      ? console.log("El producto es: ", findProduct)
      : console.log("Not found");
  };

  addProduct = (title, description, price, thumbnail, code, stock) => {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Incomplete data");
      return;
    }

    let productos = this.getProducts();
    let codeRepeat = productos.some((item) => item.code === code);
    if (!codeRepeat) {
      let id = this.#generateID();
      let newProduct = {
        id,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      productos.push(newProduct);
      fs.writeFileSync(this.#path, JSON.stringify(productos, null, "\t"));
    } else {
      console.log(`The code ${code} is repeated`);
    }
  };

  updateProduct = (id, field, newValue) => {
    const productos = this.getProducts();
    let findIndex = productos.findIndex((prod) => prod.id === id);
    if (findIndex >= 0) {
      productos[findIndex][field] = newValue;
      fs.writeFileSync(this.#path, JSON.stringify(productos, null, "\t"));
    } else {
      console.log("Product not found");
    }
  };

  deleteProduct = (id) => {
    const productos = this.getProducts();
    let findIndex = productos.findIndex((prod) => prod.id === id);
    if (findIndex >= 0) {
      productos.splice(findIndex, 1);
      fs.writeFileSync(this.#path, JSON.stringify(productos, null, "\t"));
    } else {
      console.log("Product not found");
    }
  };
}

const productManager = new ProductManager("./products.json");


//pruebas hechas sobre el archivo
/* productManager.addProduct("Zapatos", "Zapatos de charol", 5000, "/", 1234, 40);
productManager.addProduct("Zapatos", "Zapatos de gamuza", 5000, "/", 1235, 30);
productManager.addProduct("Cartera", "Cartera ecocuero", 4000, "/", 1222, 25);
productManager.addProduct("Cinturon", "Cinturon hombre", 2000, "/", 2828, 25);
productManager.addProduct("Cinturon", "Cinturon mujer", 2000, "/", 2829, 25);

productManager.updateProduct(3, "price", 5000);
productManager.deleteProduct(4);
console.log(productManager.getProducts()); */
