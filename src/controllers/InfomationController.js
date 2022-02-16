const cloudi = require("../configs/cloudinaryCF");
const delFile = require("../middlewares/deleteFile");
module.exports.getInfo = async (req, res) => {
  try {
    return res.json("hi");
  } catch (error) {
    throw error;
  }
};
module.exports.updateInfo = async (req, res) => {
  try {
    var imageURL = [];
    for (let i = 0; i < req.files.length; i++) {
      let url = await cloudi.upImages(
        req.files[i].path,
        req.files[i].originalname
      );
      imageURL.push(url);
      delFile.dele(req.files[i].path);
    }
    res.json({ size: imageURL });
  } catch (error) {
    throw error;
  }
};
