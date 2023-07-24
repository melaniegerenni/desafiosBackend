export default class ProductService {
    constructor(dao) {
        this.dao = dao
    }

    getProducts = async () => await this.dao.getProducts()
    getProductsPaginate = async (limit, page, sort, query) => await this.dao.getProductsPaginate(limit, page, sort, query)
    getProductById = async (id) => await this.dao.getProductById(id)
    addProduct = async (product) => await this.dao.addProduct(product)
    updateProduct = async (id, updatedValues) => await this.dao.updateProduct(id, updatedValues)
    deleteProduct = async (id) => await this.dao.deleteProduct(id)
}