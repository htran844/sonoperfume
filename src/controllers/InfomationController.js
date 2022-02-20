const cloudi = require("../configs/cloudinaryCF");
const delFile = require("../middlewares/deleteFile");
const { updateInfo } = require("../services/_infoService");
module.exports.getInfo = async (req, res) => {
  try {
    return res.json("hi");
  } catch (error) {
    throw error;
  }
};
module.exports.updateInfo = async (req, res) => {
  try {
    let imageURL = [];
    let imageTB = "";
    let info = req.body;

    if (req.files.length !== 0) {
      for (let i = 0; i < req.files.length; i++) {
        let url = await cloudi.upImages(
          req.files[i].path,
          req.files[i].originalname
        );
        if (i == req.files.length - 1) {
          imageTB = url;
        } else {
          imageURL.push(url);
        }
        delFile.dele(req.files[i].path);
      }
      info.thongbao = imageTB;
      info.imageSlide = imageURL;
    }

    let result = await updateInfo(info);
    if (!result) {
      return res.status(500).json({ status: "fail", data: "" });
    } else {
      return res.status(200).json({ status: "success", data: result });
    }
  } catch (error) {
    throw error;
  }
};
