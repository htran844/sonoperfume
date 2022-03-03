const BrandModel = require("../models/BrandModel");
exports.createBrand = async (brand) => {
  try {
    return await BrandModel.create({ brand });
  } catch (error) {
    throw error;
  }
};
exports.deleteBrand = async (_id) => {
  try {
    return await BrandModel.findByIdAndDelete(_id);
  } catch (error) {
    throw error;
  }
};
exports.getAllBrand = async () => {
  try {
    return await BrandModel.find().sort({ brand: 1 });
  } catch (error) {
    throw error;
  }
};
