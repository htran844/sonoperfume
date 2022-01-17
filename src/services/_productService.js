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
exports.getAllProduct = async (data, page) => {
  try {
    const PAGE_SIZE = 5;

    if (!data.min && !data.name) {
      let lengthPage = await ProductModel.find({ ...data }).countDocuments();
      lengthPage = lengthPage / PAGE_SIZE;
      let result = await ProductModel.find({ ...data })
        .populate("productFull")
        .skip(PAGE_SIZE * (page - 1))
        .limit(PAGE_SIZE)
        .sort({ hot: -1 });
      return { lengthPage, result };
    }
    if (!data.name) {
      let costmin = data.min;
      let costmax = data.max;
      delete data.min;
      delete data.max;
      let lengthPage = await ProductModel.find({
        $and: [{ cost: { $gte: costmin } }, { cost: { $lte: costmax } }],
        ...data,
      }).countDocuments();
      lengthPage = lengthPage / PAGE_SIZE;
      let result = await ProductModel.find({
        $and: [{ cost: { $gte: costmin } }, { cost: { $lte: costmax } }],
        ...data,
      })
        .populate("productFull")
        .skip(PAGE_SIZE * (page - 1))
        .limit(PAGE_SIZE)
        .sort({ hot: -1 });
      return { lengthPage, result };
    }
    if (!data.min) {
      let namefind = data.name;
      delete data.name;
      let lengthPage = await ProductModel.find({
        name: { $regex: namefind, $options: "i" },
        ...data,
      }).countDocuments();
      lengthPage = lengthPage / PAGE_SIZE;
      let result = await ProductModel.find({
        name: { $regex: namefind, $options: "i" },
        ...data,
      })
        .populate("productFull")
        .skip(PAGE_SIZE * (page - 1))
        .limit(PAGE_SIZE)
        .sort({ hot: -1 });
      return { lengthPage, result };
    }
  } catch (error) {
    throw error;
  }
};
