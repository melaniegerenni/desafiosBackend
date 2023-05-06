import mongoose from "mongoose";
const prodCollection = "products";

const prodSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: Number, required: true },
  price: { type: Number, required: true },
  status: Boolean,
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  thumbnail: String,
});

const prodModel = mongoose.model(prodCollection, prodSchema);

export default prodModel;
