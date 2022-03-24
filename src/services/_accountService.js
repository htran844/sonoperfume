const AccountModel = require("../models/AccountModel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
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
exports.getOneByEmail = async (email) => {
  try {
    return await AccountModel.findOne({ email: email });
  } catch (error) {
    throw error;
  }
};
exports.Login = async (email, pass) => {
  try {
    let account = await AccountModel.findOne({ email: email });
    if (account) {
      return bcrypt.compareSync(pass, account.password);
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};
exports.getAccountByToken = async (token) => {
  try {
    let email = jwt.verify(token, process.env.TOKEN_KEY);
    if (email) {
      return await AccountModel.findOne({ email: email });
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};
exports.changePass = async (token, oldpass, newpass) => {
  try {
    let email = jwt.verify(token, process.env.TOKEN_KEY);
    let account = await AccountModel.findOne({ email: email });
    if (account) {
      let check = bcrypt.compareSync(oldpass, account.password);
      if (check) {
        const hash = bcrypt.hashSync(newpass, 5);
        await AccountModel.findOneAndUpdate(
          { email: email },
          { password: hash }
        );
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};
exports.updateAccount = async (token, account) => {
  try {
    let email = jwt.verify(token, process.env.TOKEN_KEY);
    return await AccountModel.findOneAndUpdate(
      { email: email },
      { ...account }
    );
  } catch (error) {
    throw error;
  }
};
exports.createNewPass = async (data) => {
  try {
    const hash = bcrypt.hashSync(data.pass, 5);
    return await AccountModel.findOneAndUpdate(
      { email: data.email },
      { password: hash }
    );
  } catch (error) {
    throw error;
  }
};
exports.resetWallet = async (_id) => {
  try {
    let account = await AccountModel.findByIdAndUpdate(_id, { wallet: 0 });
  } catch (error) {
    throw error;
  }
};
