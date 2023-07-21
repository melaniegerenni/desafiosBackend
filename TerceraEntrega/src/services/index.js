import UserService from "./userService.js";
import ProductService from "./productsService.js"
import CartService from "./cartService.js";
import MessageService from "./messageService.js";
import TicketService from "./ticketService.js";
import PersistenceFactory from "../models/persistenceFactory.js";


const dao = await PersistenceFactory.getPersistence();

export const userService = new UserService(dao)
export const productService = new ProductService(dao)
export const cartService = new CartService(dao)
export const messageService = new MessageService(dao)
export const ticketService = new TicketService(dao)