const mongoose = require("mongoose");
const ProductFullSchema = mongoose.Schema(
  {
    capaFullseal: {
      type: String,
    },
    costFullseal: {
      type: String,
    },
    statusFullseal: {
      type: Boolean,
    },
    capaTester: {
      type: String,
    },
    costTester: {
      type: String,
    },
    statusTester: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("ProductFull", ProductFullSchema);
