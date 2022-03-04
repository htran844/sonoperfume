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
    return await ProductModel.findById(_id);
  } catch (error) {
    throw error;
  }
};
exports.getOneBySlug = async (slug) => {
  try {
    return await ProductModel.findOne({ slug: slug });
  } catch (error) {
    throw error;
  }
};
exports.getAllProduct = async (data, page, PAGE_SIZE, sort_handle) => {
  try {
    // sắp xếp theo giá và đánh giá: tạo obj và gán các thuộc tính
    let sort = {};
    switch (sort_handle) {
      case "1":
        sort.cost = 1;
        break;
      case "2":
        sort.cost = -1;
        break;
      case "3":
        sort.hot = -1;
        break;
      default:
        sort = {};
    }
    // tìm khi có thương hiệu
    if (data.thuongHieu) {
      let lengthPage = await ProductModel.find({
        ...data,
      }).countDocuments();
      lengthPage = lengthPage / PAGE_SIZE;
      lengthPage = Math.ceil(lengthPage);

      let result = await ProductModel.find({
        ...data,
      })

        .skip(PAGE_SIZE * (page - 1))
        .limit(PAGE_SIZE)
        .sort({ ...sort });
      return { lengthPage, result };
    }
    // tìm khi có name
    if (data.name) {
      let namefind = data.name;
      delete data.name;
      let lengthPage = await ProductModel.find({
        name: { $regex: namefind, $options: "i" },
        ...data,
      }).countDocuments();
      lengthPage = lengthPage / PAGE_SIZE;
      lengthPage = Math.ceil(lengthPage);

      let result = await ProductModel.find({
        name: { $regex: namefind, $options: "i" },
        ...data,
      })

        .skip(PAGE_SIZE * (page - 1))
        .limit(PAGE_SIZE)
        .sort({ ...sort });
      return { lengthPage, result };
    }
    // khi gender là nam hoặc nữ phải tìm cả unisex
    // tìm khi có gender và sort ko có cost
    if (data.gender && !data.min) {
      let genderfind = data.gender;
      if (genderfind == "Nam" || genderfind == "Nữ") {
        let lengthPage = await ProductModel.find({
          $or: [{ gender: genderfind }, { gender: "Unisex" }],
        }).countDocuments();
        lengthPage = lengthPage / PAGE_SIZE;
        lengthPage = Math.ceil(lengthPage);

        let result = await ProductModel.find({
          $or: [{ gender: genderfind }, { gender: "Unisex" }],
        })

          .skip(PAGE_SIZE * (page - 1))
          .limit(PAGE_SIZE)
          .sort({ ...sort });
        return { lengthPage, result };
      } else {
        let lengthPage = await ProductModel.find({
          ...data,
        }).countDocuments();
        lengthPage = lengthPage / PAGE_SIZE;
        lengthPage = Math.ceil(lengthPage);

        let result = await ProductModel.find({
          ...data,
        })

          .skip(PAGE_SIZE * (page - 1))
          .limit(PAGE_SIZE)
          .sort({ ...sort });
        return { lengthPage, result };
      }
    }
    // tìm khi có cost và sort ko có gender
    if (data.min && !data.gender) {
      let costmin = data.min;
      let costmax = data.max;
      delete data.min;
      delete data.max;
      let lengthPage = await ProductModel.find({
        $and: [{ cost: { $gte: costmin } }, { cost: { $lte: costmax } }],
      }).countDocuments();
      lengthPage = lengthPage / PAGE_SIZE;
      lengthPage = Math.ceil(lengthPage);

      let result = await ProductModel.find({
        $and: [{ cost: { $gte: costmin } }, { cost: { $lte: costmax } }],
      })

        .skip(PAGE_SIZE * (page - 1))
        .limit(PAGE_SIZE)
        .sort({ ...sort });
      return { lengthPage, result };
    }
    // nếu có cả gender và cost
    if (data.min && data.gender) {
      let costmin = data.min;
      let costmax = data.max;
      delete data.min;
      delete data.max;

      let genderfind = data.gender;
      if (genderfind == "Nam" || genderfind == "Nữ") {
        let lengthPage = await ProductModel.find({
          $or: [{ gender: genderfind }, { gender: "Unisex" }],
          $and: [{ cost: { $gte: costmin } }, { cost: { $lte: costmax } }],
        }).countDocuments();
        lengthPage = lengthPage / PAGE_SIZE;
        lengthPage = Math.ceil(lengthPage);

        let result = await ProductModel.find({
          $or: [{ gender: genderfind }, { gender: "Unisex" }],
          $and: [{ cost: { $gte: costmin } }, { cost: { $lte: costmax } }],
        })

          .skip(PAGE_SIZE * (page - 1))
          .limit(PAGE_SIZE)
          .sort({ ...sort });
        return { lengthPage, result };
      } else {
        let lengthPage = await ProductModel.find({
          ...data,
          $and: [{ cost: { $gte: costmin } }, { cost: { $lte: costmax } }],
        }).countDocuments();
        lengthPage = lengthPage / PAGE_SIZE;
        lengthPage = Math.ceil(lengthPage);

        let result = await ProductModel.find({
          ...data,
          $and: [{ cost: { $gte: costmin } }, { cost: { $lte: costmax } }],
        })

          .skip(PAGE_SIZE * (page - 1))
          .limit(PAGE_SIZE)
          .sort({ ...sort });
        return { lengthPage, result };
      }
    }
    // tìm khi không có gì cả
    let lengthPage = await ProductModel.find().countDocuments();
    lengthPage = lengthPage / PAGE_SIZE;
    lengthPage = Math.ceil(lengthPage);

    let result = await ProductModel.find()

      .skip(PAGE_SIZE * (page - 1))
      .limit(PAGE_SIZE)
      .sort({ ...sort });
    return { lengthPage, result };
  } catch (error) {
    throw error;
  }
};
exports.getProductHome = async (gender) => {
  try {
    return await ProductModel.find({ gender: gender, status: true })
      .limit(9)
      .sort({ hot: -1 });
  } catch (error) {
    throw error;
  }
};
