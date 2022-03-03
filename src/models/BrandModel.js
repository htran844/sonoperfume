const mongoose = require("mongoose");
const BrandSchema = mongoose.Schema({
  brand: {
    type: String,
  },
});
module.exports = mongoose.model("Brand", BrandSchema);
