const mongoose = require("mongoose");
const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    slug: {
      type: String,
    },
    gender: {
      type: String,
    },
    hot: {
      type: Number,
    },
    cost: {
      type: Number,
    },
    oldcost: {
      type: Number,
    },
    refundcost: {
      type: Number,
    },
    image: {
      type: String,
    },
    thuongHieu: {
      type: String,
    },
    xuatXu: {
      type: String,
    },
    phatHanh: {
      type: String,
    },
    nhomHuong: {
      type: String,
    },
    phongCach: {
      type: String,
    },
    huongDau: {
      type: String,
    },
    huongGiua: {
      type: String,
    },
    huongCuoi: {
      type: String,
    },
    mota: {
      type: String,
    },
    status: {
      type: Boolean,
    },
    productFull: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Product", ProductSchema);
