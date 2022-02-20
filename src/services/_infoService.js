const InfoModel = require("../models/InfomationModel");
exports.updateInfo = async (info) => {
  try {
    const infoDB = await InfoModel.find();
    let _id = "";
    if (infoDB.length == 0) {
      let newInfo = await InfoModel.create({ ...info });
      _id = newInfo._id;
    } else {
      const infoDB = await InfoModel.find();
      _id = infoDB[0]._id;
    }

    return await InfoModel.findByIdAndUpdate({ _id }, { ...info });
  } catch (error) {
    throw error;
  }
};
exports.getInfo = async () => {
  try {
    const infoDB = await InfoModel.find();
    return infoDB[0];
  } catch (error) {
    throw error;
  }
};
