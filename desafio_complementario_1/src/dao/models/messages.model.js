import mongoose from "mongoose";
const messCollection = "messages";

const messSchema = new mongoose.Schema({
  user: String,
  message: String,
});

const messModel = mongoose.model(messCollection, messSchema);

export default messModel;
