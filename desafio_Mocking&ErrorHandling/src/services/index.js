import UserService from "./userService.js";
import ProductService from "./productsService.js"
import CartService from "./cartService.js";
import MessageService from "./messageService.js";
import TicketService from "./ticketService.js";
import PersistenceFactory from "../dao/factory.js";

const dao = await PersistenceFactory.getPersistence();

export const userService = new UserService(dao.entity.user)
export const productService = new ProductService(dao.entity.product)
export const cartService = new CartService(dao.entity.cart)
export const messageService = new MessageService(dao.entity.message)
export const ticketService = new TicketService(dao.entity.ticket)