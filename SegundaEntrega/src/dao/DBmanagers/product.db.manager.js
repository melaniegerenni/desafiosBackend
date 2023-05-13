import prodModel from "../models/products.model.js";

class ProductDBManager {
  getProducts = async () => {
    const products = await prodModel.find().lean().exec();
    return products;
  };

  getProductsPaginate = async (limit, page, sort, query) => {
    const products = await prodModel.paginate(query, {limit: limit, page: page, sort: {price: sort}, lean: true});
    return products;
  };

  getProductById = async (id) => {
    try {
      const product = await prodModel.findById(id).exec();
      console.log(product);
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
        const productGenerated = new prodModel(product);
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
      const response = await prodModel
        .findByIdAndUpdate(id, updatedValues)
        .exec();
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  deleteProduct = async (id) => {
    try {
      const response = await prodModel.findByIdAndDelete(id).exec();
      return response;
    } catch (error) {
      console.log(error);
    }
  };
}

export default ProductDBManager;
