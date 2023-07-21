import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

import config from "../config/config.js";
import User from "./userModel.js";
import Product from "./productModel.js";
import Cart from "./cartsModel.js";
import Message from "./messageModel.js";
import Ticket from "./ticketModel.js";

export default class MongoDao {
  constructor() {
    this.mongoose = mongoose
      .connect(config.mongo.url)
      .then((response) => console.log("DB Connected"))
      .catch((err) => {
        console.log(err.message);
        process.exit();
      });
    const timestamp = {
      timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    };
    const userSchema = mongoose.Schema(User.schema, timestamp);
    const productSchema = mongoose.Schema(Product.schema, timestamp);
    productSchema.plugin(mongoosePaginate);
    const cartSchema = mongoose.Schema(Cart.schema, timestamp);
    const messageSchema = mongoose.Schema(Message.schema, timestamp);
    const ticketSchema = mongoose.Schema(Ticket.schema, {timestamps: {createdAt: "purchase_datetime", updatedAt: "updated_at"}});
    this.models = {
      [User.model]: mongoose.model(User.model, userSchema),
      [Product.model]: mongoose.model(Product.model, productSchema),
      [Cart.model]: mongoose.model(Cart.model, cartSchema),
      [Message.model]: mongoose.model(Message.model, messageSchema),
      [Ticket.model]: mongoose.model(Ticket.model, ticketSchema),
    };
  }
}
