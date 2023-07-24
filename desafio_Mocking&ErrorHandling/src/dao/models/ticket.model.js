import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    code: { type: String },
    amount: { type: Number },
    purchaser: { type: String },
  },
  { timestamps: { createdAt: "purchase_datetime", updatedAt: "updated_at" } }
);

const ticketModel = mongoose.model("tickets", ticketSchema);

export default ticketModel;
