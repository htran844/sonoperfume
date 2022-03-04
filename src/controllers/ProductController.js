const cloudi = require("../configs/cloudinaryCF");
const delFile = require("../middlewares/deleteFile");
const {
  createProduct,
  updateProductByID,
  deleteProductByID,
  changeStatus,
  getOneByID,
  getAllProduct,
} = require("../services/_productService");
module.exports.createProduct = async (req, res) => {
  try {
    // nhan anh, up len cloud, luu link va xoa anh
    let imageName = req.file.originalname.slice(
      0,
      req.file.originalname.length - 4
    );
    const imageURL = await cloudi.upImages(req.file.path, imageName);
    await delFile.dele(req.file.path);
    // nhan product
    let product = req.body;
    // chen link anh
    product.image = imageURL;
    // goi service va tao product
    let result = await createProduct(product);
    if (!result) {
      return res.status(500).json({ status: "fail", data: "" });
    } else {
      return res.status(200).json({ status: "success", data: result });
    }
  } catch (error) {
    throw error;
  }
};
module.exports.updateProduct = async (req, res) => {
  try {
    // nhan id
    let _id = req.params.id;
    // nhan product
    let product = req.body;
    // delete product.image
    if (product.image) {
      delete product.image;
    }

    if (typeof req.file !== "undefined") {
      // nhan anh, up len cloud, luu link va xoa anh
      let imageName = req.file.originalname.slice(
        0,
        req.file.originalname.length - 4
      );
      const imageURL = await cloudi.upImages(req.file.path, imageName);
      await delFile.dele(req.file.path);
      // chen link anh
      product.image = imageURL;
    }
    let result = await updateProductByID(_id, product);
    if (!result) {
      return res.status(500).json({ status: "fail", data: "" });
    } else {
      return res.status(200).json({ status: "success", data: result });
    }
  } catch (error) {
    throw error;
  }
};
module.exports.deleteProduct = async (req, res) => {
  try {
    const _id = req.params.id;
    let result = await deleteProductByID(_id);

    if (!result) {
      return res.status(500).json({ status: "fail", data: "" });
    } else {
      return res.status(200).json({ status: "success", data: result });
    }
  } catch (error) {
    throw error;
  }
};
module.exports.changeStatus = async (req, res) => {
  try {
    const _id = req.params.id;
    let result = await changeStatus(_id);
    if (!result) {
      return res.status(500).json({ status: "fail", data: "" });
    } else {
      return res.status(200).json({ status: "success", data: result });
    }
  } catch (error) {
    throw error;
  }
};
module.exports.getOneByID = async (req, res) => {
  try {
    const _id = req.params.id;
    let result = await getOneByID(_id);
    if (!result) {
      return res.status(500).json({ status: "fail", data: "" });
    } else {
      return res.status(200).json({ status: "success", data: result });
    }
  } catch (error) {
    throw error;
  }
};
module.exports.getAllProductAdmin = async (req, res) => {
  try {
    let page = req.query.page;
    delete req.query.page;
    let result = await getAllProduct(req.query, page, 4);

    if (!result) {
      return res.status(500).json({ status: "fail", data: "" });
    } else {
      return res.status(200).json({ status: "success", data: result });
    }
  } catch (error) {
    throw error;
  }
};
