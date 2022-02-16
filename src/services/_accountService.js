const AccountModel = require("../models/AccountModel");
exports.createAccount = async (account) => {
  try {
    return await AccountModel.create(account);
  } catch (error) {
    throw error;
  }
};
exports.getListAccount = async (mail, page) => {
  try {
    const PAGE_SIZE = 5;

    if (typeof mail !== "undefined") {
      let lengthPage = await AccountModel.find({
        email: { $regex: mail, $options: "i" },
      }).countDocuments();
      lengthPage = lengthPage / PAGE_SIZE;
      let accounts = await AccountModel.find({
        email: { $regex: mail, $options: "i" },
      })
        .skip(PAGE_SIZE * (page - 1))
        .limit(PAGE_SIZE);
      return { lengthPage, accounts };
    } else {
      let lengthPage = await AccountModel.find().countDocuments();
      lengthPage = lengthPage / PAGE_SIZE;
      let accounts = await AccountModel.find()
        .skip(PAGE_SIZE * (page - 1))
        .limit(PAGE_SIZE);
      return { lengthPage, accounts };
    }
  } catch (error) {
    throw error;
  }
};
exports.getOneAccountByID = async (_id) => {
  try {
    return await AccountModel.findById(_id);
  } catch (error) {
    throw error;
  }
};
