import Product from '../models/productModel.js'
import Repository from './Repository.js'

export default class ProductService extends Repository {
    constructor(dao) {
        super(dao, Product.model)
    }

    getProducts = async () => {
        const products = await this.dao.models[this.model].find().lean().exec();
        return products;
      };
    
      getProductsPaginate = async (limit, page, sort, query) => {
        const products = await this.dao.models[Product.model].paginate(query, {limit: limit, page: page, sort: {price: sort}, lean: true});
        return products;
      };
    
      getProductById = async (id) => {
        try {
          const product = await this.dao.models[this.model].findById(id).exec();
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
        if (!title || !description || !code || !price || !stock || !category) {
          console.log("Incomplete data");
          return;
        }
    
        const productos = await this.getProducts();
        let codeRepeat = productos.some((item) => item.code === code);
        if (!codeRepeat) {
          try {
            const productGenerated = new this.dao.models[this.model](product);
            await productGenerated.save();
            return productGenerated;
          } catch (error) {
            console.log(error);
          }
        } else {
          console.log(`The code ${code} is repeated`);
        }
      };
    
      updateProduct = async (id, updatedValues) => {
        try {
          const response = await this.dao.models[this.model]
            .findByIdAndUpdate(id, updatedValues)
            .exec();
          return response;
        } catch (error) {
          console.log(error);
        }
      };
    
      deleteProduct = async (id) => {
        try {
          const response = await this.dao.models[this.model].findByIdAndDelete(id).exec();
          return response;
        } catch (error) {
          console.log(error);
        }
      };
}