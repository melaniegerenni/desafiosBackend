export default class ProductModel {
  static get model() {
    return "products";
  }

  static get schema() {
    return {
      title: { type: String, required: true },
      description: { type: String, required: true },
      code: { type: Number, required: true },
      price: { type: Number, required: true },
      status: { type: Boolean, default: true },
      stock: { type: Number, required: true },
      category: { type: String, required: true },
      thumbnail: String,
    };
  }
}
