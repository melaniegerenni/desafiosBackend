import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const prodCollection = "products";

const prodSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: Number, required: true },
  price: { type: Number, required: true },
  status: { type: Boolean, default: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  thumbnail: String,
});

prodSchema.plugin(mongoosePaginate);
const prodModel = mongoose.model(prodCollection, prodSchema);

export default prodModel;
