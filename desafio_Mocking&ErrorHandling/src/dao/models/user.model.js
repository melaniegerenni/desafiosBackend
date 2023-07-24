import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String },
    age: { type: Number },
    password: { type: String },
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "carts",
    },
    role: { type: String, default: "user" },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const userModel = mongoose.model("users", userSchema);

export default userModel;
