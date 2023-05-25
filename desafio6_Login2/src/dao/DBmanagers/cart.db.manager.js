import cartModel from "../models/carts.model.js";

class CartDBManager {
  getCarts = async () => {
    const carts = await cartModel.find().lean().exec();
    return carts;
  };

  getCartById = async (id) => {
    try {
      const cart = await cartModel
        .findById(id)
        .populate("products.product")
        .lean()
        .exec();
      return cart;
    } catch (error) {
      console.log(error);
    }
  };

  addProduct = async (cid, pid) => {
    const newProduct = { product: pid, quantity: 1 };
    try {
      const cart = await cartModel.findById(cid);
      const indexProduct = cart.products.findIndex(
        (item) => item.product == pid
      );
      if (indexProduct >= 0) {
        cart.products[indexProduct].quantity += 1;
      } else {
        cart.products.push(newProduct);
      }
      await cart.save();
      return cart;
    } catch (error) {
      console.log(error);
    }
  };

  addCart = async (cart) => {
    try {
      const cartGenerated = new cartModel(cart);
      await cartGenerated.save();
      return cartGenerated;
    } catch (error) {
      console.log(error);
    }
  };

  deleteProduct = async (cid, pid) => {
    try {
      const cart = await cartModel.findById(cid).lean().exec();
      const prods = cart.products.filter((item) => item.product != pid);
      const response = await cartModel.findByIdAndUpdate(cid, {
        products: prods,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  updateCart = async (cid, products) => {
    try {
      const response = await cartModel.findByIdAndUpdate(cid, {
        products: products,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  updateProduct = async (cid, pid, qty) => {
    try {
      const cart = await cartModel.findById(cid).lean().exec();
      const products = cart.products;
      const indexProduct = products.findIndex((item) => item.product == pid);
      products[indexProduct].quantity = qty;
      const response = await this.updateCart(cid, products);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  deleteProducts = async (cid) => {
    try {
      const response = await this.updateCart(cid, []);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
}

export default CartDBManager;
