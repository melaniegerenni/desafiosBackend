import mongoose from "mongoose";

export default class UserModel {
  static get model() {
      return 'users'
  }

  static get schema() {
      return {
        first_name: { type: String },
        last_name: { type: String },
        email: { type: String },
        age: { type: Number },
        password: { type: String },
        cart: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "carts"  
        },
        role: {type: String, default: 'user'}
      }
  }
}
