import User from '../models/userModel.js'
import Repository from './Repository.js'
import { cartService } from './index.js'

export default class UserService extends Repository {
    constructor(dao) {
        super(dao, User.model)
    }

    addUser = async (user) => {
        try {
            const newUser = new this.dao.models[this.model](user);
            const cart = await cartService.addCart([]);
            newUser.cart = cart._id;
            await newUser.save();
            return newUser;
        } catch (error) {
            console.log(error);
        }
    }

    getUser = async (email) => {
        try {
            const user = await this.dao.models[this.model].findOne({ email }).lean().exec();
            return user;
        } catch (error) {
            console.log(error);
        }
    }

    getUserById = async (id) => {
        try {
            const user = await this.dao.models[this.model].findById(id).lean().exec();
            return user;
        } catch (error) {
            console.log(error);
        }
    }

    addCart = async (id, cid) => {
        try {
            const user = await this.dao.models[this.model].findByIdAndUpdate(id, {cart: cid});
            return user;
        } catch (error) {
            console.log(error);
        }
    }
}