import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const invoiceSchema = new mongoose.Schema(
  {
    company: {
      name: String,
      address: String,
      email: String,
    },

    customer: {
      name: String,
      address: String,
    },

    invoiceInfo: {
      invoiceNumber: String,
      date: String,
    },

    items: [itemSchema],

    tax: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const Invoice = mongoose.model("Invoice", invoiceSchema);

export default Invoice;
