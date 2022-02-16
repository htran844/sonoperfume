const mongoose = require("mongoose");
const AccountShema = mongoose.Schema(
  {
    email: {
      type: String,
    },
    password: {
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
    role: {
      type: Boolean,
    },
    wallet: {
      type: Number,
    },
    status: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Account", AccountShema);
