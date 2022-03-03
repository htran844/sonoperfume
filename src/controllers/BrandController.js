const { createBrand, deleteBrand } = require("../services/_brandService");
module.exports.createBrand = async (req, res) => {
  try {
    const brand = req.body.brand_name;
    let result = await createBrand(brand);
    if (!result) {
      return res.status(500).json({ status: "fail", data: "" });
    } else {
      return res.status(200).json({ status: "success", data: result });
    }
  } catch (error) {
    throw error;
  }
};
module.exports.deleteBrand = async (req, res) => {
  try {
    const _id = req.body.id;
    let result = await deleteBrand(_id);
    if (!result) {
      return res.status(500).json({ status: "fail", data: "" });
    } else {
      return res.status(200).json({ status: "success", data: result });
    }
  } catch (error) {
    throw error;
  }
};
