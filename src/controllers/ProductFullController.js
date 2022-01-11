const {
  createProductFull,
  updateProductFullByID,
  deleteProductFullByID,
} = require("../services/_productFullService");
module.exports.createProductFull = async (req, res) => {
  try {
    const productFull = req.body;
    let result = await createProductFull(productFull);
    if (!result) {
      return res.status(500).json({ status: "fail", data: "" });
    } else {
      return res.status(200).json({ status: "success", data: result });
    }
  } catch (error) {
    throw error;
  }
};
module.exports.updateProductFull = async (req, res) => {
  try {
    const _id = req.params.id;
    const productFull = req.body;
    let result = await updateProductFullByID(_id, productFull);
    if (!result) {
      return res.status(500).json({ status: "fail", data: "" });
    } else {
      return res.status(200).json({ status: "success", data: result });
    }
  } catch (error) {
    throw error;
  }
};
module.exports.deleteProductFull = async (req, res) => {
  try {
    const _id = req.params.id;
    let result = await deleteProductFullByID(_id);
    if (!result) {
      return res.status(500).json({ status: "fail", data: "" });
    } else {
      return res.status(200).json({ status: "success", data: result });
    }
  } catch (error) {
    throw error;
  }
};
