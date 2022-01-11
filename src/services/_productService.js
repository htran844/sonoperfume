const ProductModel = require("../models/ProductModel");
exports.createProduct = async (product) => {
  try {
    return await ProductModel.create({ ...product });
  } catch (error) {
    throw error;
  }
};
exports.updateProductByID = async (_id, product) => {
  try {
    return await ProductModel.findByIdAndUpdate({ _id }, { ...product });
  } catch (error) {
    throw error;
  }
};
exports.deleteProductByID = async (_id) => {
  try {
    return await ProductModel.findByIdAndDelete(_id);
  } catch (error) {
    throw error;
  }
};
exports.changeStatus = async (_id) => {
  try {
    const product = await ProductModel.findById(_id);
    return await ProductModel.findByIdAndUpdate(
      { _id },
      { status: !product.status }
    );
  } catch (error) {
    throw error;
  }
};
exports.getOneByID = async (_id) => {
  try {
    return await ProductModel.findById(_id).populate("productFull");
  } catch (error) {
    throw error;
  }
};
exports.getOneBySlug = async (slug) => {
  try {
  } catch (error) {
    throw error;
  }
};
