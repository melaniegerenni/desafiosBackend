import productModel from "../models/product.model.js";
import CustomError from "../../services/errors/custom_error.js"
import EErrors from "../../services/errors/enums.js"
import {generateProductCodeError, generateProductErrorInfo} from "../../services/errors/info.js"

export default class Product {
  constructor() {
    this.model = productModel;
  }

  getProducts = async () => {
    const products = await this.model.find().lean().exec();
    return products;
  };

  getProductsPaginate = async (limit, page, sort, query) => {
    const products = await this.model.paginate(query, {
      limit: limit,
      page: page,
      sort: { price: sort },
      lean: true,
    });
    return products;
  };

  getProductById = async (id) => {
    try {
      const product = await this.model.findById(id).exec();
      return product;
    } catch (error) {
      console.log("Not found");
    }
  };

  addProduct = async (product) => {
    if (!product.status) {
      product.status = true;
    }
    const { title, description, code, price, stock, category } = product;
    /* if (!title || !description || !code || !price || !stock || !category) {
          console.log("Incomplete data");
          return;
        } */
    if (!title || !description || !code || !price || !stock || !category) {
      CustomError.createError({
        name: "Product creation error",
        cause: generateProductErrorInfo(product),
        message: "Typing error adding a product",
        code: EErrors.INVALID_TYPES_ERROR,
      });
    }

    const productos = await this.getProducts();
    let codeRepeat = productos.some((item) => item.code == code);
    if (!codeRepeat) {
      try {
        const productGenerated = new this.model(product);
        await productGenerated.save();
        return productGenerated;
      } catch (error) {
        console.log(error);
      }
    } else {
      //console.log(`The code ${code} is repeated`);
      CustomError.createError({
        name: "Product creation error",
        cause: generateProductCodeError(code),
        message: "Repated code",
        code: EErrors.INVALID_TYPES_ERROR,
      });
    }
  };

  updateProduct = async (id, updatedValues) => {
    try {
      const response = await this.model
        .findByIdAndUpdate(id, updatedValues)
        .exec();
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  deleteProduct = async (id) => {
    try {
      const response = await this.model.findByIdAndDelete(id).exec();
      return response;
    } catch (error) {
      console.log(error);
    }
  };
}
