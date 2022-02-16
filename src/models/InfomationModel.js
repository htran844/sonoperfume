const mongoose = require("mongoose");
const InfomationShema = mongoose.Schema(
  {
    webname: {
      type: String,
    },
    address: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    facebook: {
      type: String,
    },
    insta: {
      type: String,
    },
    youtube: {
      type: String,
    },
    imageSlide: {
      type: Array,
    },
    thongbao: {
      type: String,
    },
    messenger: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Infomation", InfomationShema);
