const InfoModel = require("../models/InfomationModel");
exports.updateInfo = async (info) => {
  try {
    const data = await InfoModel.findByIdAndUpdate(info._id, { ...info });
    return data;
  } catch (error) {
    throw error;
  }
};
