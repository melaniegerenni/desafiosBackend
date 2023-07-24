import { productService } from "../services/index.js";

export default class ProductsController {
  constructor() {
    this.productService = productService;
  }

  getProducts = async (req, res) => {
    const limit = +req.query.limit || 10;
    const page = +req.query.page || 1;
    const sort = req.query.sort || "";
    const category = req.query.category;
    const price = +req.query.price;
    let query = {};
    if (category) {
      query.category = category;
    }
    if (price) {
      query.price = price;
    }
    const products = await this.productService.getProductsPaginate(
      limit,
      page,
      sort,
      query
    );
    const path = `/products?limit=${limit}&&page=`;
    products.prevLink = products.hasPrevPage ? path + products.prevPage : "";
    products.nextLink = products.hasNextPage ? path + products.nextPage : "";

    if (products) {
      res.status(200).json({ products });
    }
  };

  getProductById = async (req, res) => {
    const pid = req.params.pid;
    const product = await this.productService.getProductById(pid);
    if (product) {
      res.status(200).json({ product });
    } else {
      res.status(404).send("<h1>Not found</h1>");
    }
  };

  addProduct = async (req, res) => {
    const productNew = req.body;
    const productGenerated = await this.productService.addProduct(productNew);
    if (productGenerated) {
      res.status(200).send(`Producto creado con éxito`);
    } else res.status(400).send("Error en la creación del producto");
  };

  updateProduct = async (req, res) => {
    const pid = req.params.pid;
    const updatedValues = req.body;
    const product = await this.productService.updateProduct(pid, updatedValues);
    if (product) {
      res.status(200).json({ product });
    } else {
      res.status(404).send("Product not found");
    }
  };

  deleteProduct = async (req, res) => {
    const pid = req.params.pid;
    const response = await this.productService.deleteProduct(pid);
    if (response) {
      res.status(200).send("Producto eliminado con éxito");
    } else {
      res.status(404).send("Product not found");
    }
  };
}
