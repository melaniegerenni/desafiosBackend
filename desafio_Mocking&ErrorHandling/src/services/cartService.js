export default class CartService {
  constructor(dao) {
    this.dao = dao
  }

  getCarts = async () => await this.dao.getCarts();
  getCart = async (id) => await this.dao.getCart(id)
  getCartById = async (id) => await this.dao.getCartById(id)
  addProduct = async (cid, pid) => await this.dao.addProduct(cid,pid)
  addCart = async (cart) => await this.dao.addCart(cart)
  deleteProduct = async (cid, pid) => await this.dao.deleteProduct(cid, pid)
  updateCart = async (cid, products) => await this.dao.updateCart(cid, products)
  updateProduct = async (cid, pid, qty) => await this.dao.updateProduct(cid, pid, qty)
  deleteManyProducts = async (cid, products) => await this.dao.deleteManyProducts(cid, products)
  deleteProducts = async (cid) => await this.dao.deleteProducts(cid)
}
