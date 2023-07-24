import { productService } from "../services/index.js";
import { cartService } from "../services/index.js";
import UserDTO from "../dtos/userDto.js";

export default class ViewsController {
    renderHome = async (req, res) => {
        const products = await productService.getProducts();
        res.render("home", { products });
    };
      
    renderRealTime = async (req, res) => {
        const products = await productService.getProducts();
        res.render("realTimeProducts", { products });
      };
      
    renderProducts = async (req, res) => {
        const {first_name, role, cart} = req.user.user;
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
        const products = await productService.getProductsPaginate(
          limit,
          page,
          sort,
          query
        );
        const path = `/products?limit=${limit}&page=`;
        const cartLink = `/carts/${cart}`;
        products.prevLink = products.hasPrevPage ? path + products.prevPage : "";
        products.nextLink = products.hasNextPage ? path + products.nextPage : "";
        res.render("products", {...products, first_name, role: role || "usuario", cart, cartLink});
    };
      
    renderCart = async (req, res) => {
        const cid = req.params.cid;
        const cart = await cartService.getCartById(cid);
        const products = cart.products;
        res.render("cart", {products, cid});
      };
      
    renderProfile = (req,res) => {
      const user = req.user.user;
      const userDTO =  new UserDTO(user);
      res.render('profile', {user: userDTO})
    };
}