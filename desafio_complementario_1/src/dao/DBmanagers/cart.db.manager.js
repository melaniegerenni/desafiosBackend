import cartModel from "../models/carts.model.js";

class CartDBManager {
  getCarts = async () => {
    const carts = await cartModel.find().lean().exec();
    return carts;
  };

  getCartById = async (id) => {
    try {
      const cart = await cartModel.findById(id).lean().exec();
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
}

export default CartDBManager;
