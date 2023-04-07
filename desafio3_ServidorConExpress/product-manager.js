import fs from "fs";

class ProductManager {
  #path;

  constructor(path) {
    this.#path = path;
  }

  #generateID = async () => {
      const productos = await this.getProducts();
      let id;
      productos.length == 0
        ? (id = 1)
        : (id = productos[productos.length - 1].id + 1);
      return id;
  };

  getProducts = async () => {
    const contenido = await fs.promises.readFile(this.#path, "utf-8");
    let productos = JSON.parse(contenido);
    return productos;
  };

  getProducById = async (id) => {
    const productos = await this.getProducts();
    let findProduct = productos.find((prod) => prod.id == id);
    if(findProduct) {
      return findProduct;
    } else {
      console.log("Not found");
    }
  };

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Incomplete data");
      return;
    }

    let productos = await this.getProducts();
    let codeRepeat = productos.some((item) => item.code === code);
    if (!codeRepeat) {
      let id = await this.#generateID();
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
      await fs.promises.writeFile(this.#path, JSON.stringify(productos, null, "\t"));
    } else {
      console.log(`The code ${code} is repeated`);
    }
  };

  updateProduct = async (id, field, newValue) => {
    const productos = await this.getProducts();
    let findIndex = productos.findIndex((prod) => prod.id === id);
    if (findIndex >= 0) {
      productos[findIndex][field] = newValue;
      await fs.promises.writeFile(this.#path, JSON.stringify(productos, null, "\t"));
    } else {
      console.log("Product not found");
    }
  };

  deleteProduct = async (id) => {
    const productos = await this.getProducts();
    let findIndex = productos.findIndex((prod) => prod.id === id);
    if (findIndex >= 0) {
      productos.splice(findIndex, 1);
      await fs.promises.writeFile(this.#path, JSON.stringify(productos, null, "\t"));
    } else {
      console.log("Product not found");
    }
  };
}

export default ProductManager;