const ProductFullModel = require("../models/ProductFullModel");
exports.createProductFull = async (productFull) => {
  try {
    return await ProductFullModel.create({ ...productFull });
  } catch (error) {
    throw error;
  }
};
exports.updateProductFullByID = async (_id, productFull) => {
  try {
    return await ProductFullModel.findByIdAndUpdate(
      { _id },
      { ...productFull }
    );
  } catch (error) {
    throw error;
  }
};
exports.deleteProductFullByID = async (_id) => {
  try {
    return await ProductFullModel.findByIdAndDelete(_id);
  } catch (error) {
    throw error;
  }
};
