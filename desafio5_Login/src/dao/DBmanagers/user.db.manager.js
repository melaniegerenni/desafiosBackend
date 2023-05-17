import userModel from "../models/users.model.js";

class UserManagerDB {
    addUser = async (user) => {
        try {
            const newUser = new userModel(user);
            await newUser.save();
            return true;
        } catch (error) {
            console.log(error);
        }
    }

    getUser = async (email, password) => {
        try {
            const user = await userModel.findOne({ email, password }).lean().exec();
            return user;
        } catch (error) {
            console.log(error);
        }
    }
}

export default UserManagerDB;