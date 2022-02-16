const {
  createAccount,
  getListAccount,
  getOneAccountByID,
} = require("../services/_accountService");

module.exports.createAccount = async (req, res) => {
  try {
    const account = req.body;
    account.role = false;
    account.status = true;
    let result = await createAccount(account);
    if (!result) {
      return res.status(500).json({ message: "fail", data: result });
    } else {
      return res.status(200).json({ message: "success", data: result });
    }
  } catch (error) {
    throw error;
  }
};
module.exports.getListAccount = async (req, res) => {
  try {
    const mail = req.query.email;
    let result = await getListAccount(mail);
    if (!result) {
      return res.status(500).json({ message: "fail", data: result });
    } else {
      return res.status(200).json({ message: "success", data: result });
    }
  } catch (error) {
    throw error;
  }
};
module.exports.getOneAccountByID = async (req, res) => {
  try {
    const _id = req.params.id;
    let result = await getOneAccountByID(_id);
    if (!result) {
      return res.status(500).json({ message: "fail", data: result });
    } else {
      return res.status(200).json({ message: "success", data: result });
    }
  } catch (error) {
    throw error;
  }
};
