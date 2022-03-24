const mongoose = require("mongoose");
const OrderSchema = mongoose.Schema(
  {
    accountId: {
      type: String,
      ref: "Account",
    },
    email: {
      type: String,
    },
    name: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    message: {
      type: String,
    },
    visono: {
      type: Boolean,
    },
    payment: {
      type: String,
    },
    status: {
      type: String,
    },
    totalCost: {
      type: Number,
    },
    refundcost: {
      type: Number,
    },
    listProduct: [
      {
        slug: String,
        name: String,
        cost: Number,
        image: String,
        refund: Number,
        quantity: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Order", OrderSchema);
