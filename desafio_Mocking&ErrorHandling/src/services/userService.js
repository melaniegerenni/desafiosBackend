export default class UserService {
    constructor(dao) {
        this.dao = dao
    }

    addUser = async (user) => await this.dao.addUser(user)
    getUser = async (email) => await this.dao.getUser(email)
    getUserById = async (id) => await this.dao.getUserById(id)
    addCart = async (id, cid) => await this.dao.addCart(id, cid)
}