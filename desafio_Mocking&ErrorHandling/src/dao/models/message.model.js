import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    user: String,
    message: String,
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const messageModel = mongoose.model("messages", messageSchema);

export default messageModel;
