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

  getProductById = async (id) => {
    const productos = await this.getProducts();
    let findProduct = productos.find((prod) => prod.id == id);
    if (findProduct) {
      return findProduct;
    } else {
      console.log("Not found");
    }
  };

  addProduct = async (product) => {
    if(!product.status){
      product.status = true;
    }
    const {title, description, code, price, status, stock, category, thumbnail} = product;
    if (!title || !description || !code || !price || !stock || !category) {
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
        code,
        price,
        status,
        stock,
        category,
        thumbnail,
      };
      productos.push(newProduct);
      await fs.promises.writeFile(
        this.#path,
        JSON.stringify(productos, null, "\t")
      );
      return productos;
    } else {
      console.log(`The code ${code} is repeated`);
    }
  };

  updateProduct = async (id, updatedValues) => {
    const productos = await this.getProducts();
    let findIndex = productos.findIndex((prod) => prod.id == id);
    if (findIndex >= 0) {
      for (let prop in updatedValues) {
        if (prop !== "id" && productos[findIndex][prop]) {
          productos[findIndex][prop] = updatedValues[prop];
        }
      }
      await fs.promises.writeFile(
        this.#path,
        JSON.stringify(productos, null, "\t")
      );
      return productos[findIndex];
    } else {
      console.log("Product not found");
    }
  };

  deleteProduct = async (id) => {
    const productos = await this.getProducts();
    let findIndex = productos.findIndex((prod) => prod.id == id);
    if (findIndex >= 0) {
      productos.splice(findIndex, 1);
      await fs.promises.writeFile(
        this.#path,
        JSON.stringify(productos, null, "\t")
      );
      return productos;
    } else {
      console.log("Product not found");
    }
  };
}

export default ProductManager;
