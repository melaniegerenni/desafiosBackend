import userModel from "../models/user.model.js";
import Cart from "./cartMongoDao.js";
const cartDao = new Cart()

export default class User {
    constructor () {
        this.model = userModel
    }

    addUser = async (user) => {
        try {
            const newUser = new this.model(user);
            const cart = await cartDao.addCart([]);
            newUser.cart = cart._id;
            await newUser.save();
            return newUser;
        } catch (error) {
            console.log(error);
        }
    }

    getUser = async (email) => {
        try {
            const user = await this.model.findOne({ email }).lean().exec();
            return user;
        } catch (error) {
            console.log(error);
        }
    }

    getUserById = async (id) => {
        try {
            const user = await this.model.findById(id).lean().exec();
            return user;
        } catch (error) {
            console.log(error);
        }
    }

    addCart = async (id, cid) => {
        try {
            const user = await this.model.findByIdAndUpdate(id, {cart: cid});
            return user;
        } catch (error) {
            console.log(error);
        }
    }
}