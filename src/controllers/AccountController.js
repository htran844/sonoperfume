const {
  createAccount,
  getListAccount,
  getOneAccountByID,
  getOneByEmail,
  Login,
  changePass,
  updateAccount,
  getAccountByToken,
  createNewPass,
} = require("../services/_accountService");
const { getInfo } = require("../services/_infoService");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const hanhdlemailer = require("../middlewares/sendMailsono");

module.exports.createAccount = async (req, res) => {
  try {
    let account = req.body;
    let findAccount = await getOneByEmail(account.email);
    if (findAccount) {
      return res.status(200).json({ message: "had", data: [] });
    }
    const hash = bcrypt.hashSync(account.password, 5);
    account.password = hash;
    account.role = false;
    account.status = true;
    account.address = "";
    account.phone = "";
    account.wallet = 0;
    account.name = account.email.slice(0, account.email.search("@"));
    let result = await createAccount(account);
    if (!result) {
      return res.status(500).json({ message: "fail", data: result });
    } else {
      let subject = "Tài khoản của bạn ở SONO perfume đã được tạo!";
      let htmlcontent = `<div style="padding: 50px; width: 500px; background-color: #F2F2F2">
			<div style="background-color: #03989E; color: white; font-size: 32px; height: 60px">Chào mừng tới SONO perfume</div>
			<div>
				<p style="padding: 10px 0">Xin chào ${account.name}</p>
				<p>Cảm ơn bạn đã tạo tài khoản ở SONO PERFUME. Tên tài khoản của bạn là ${account.name}. Bạn có thể truy cập web để xem  nhiều thứ khác tại: <a href=" https://sonoperfume.com/"> https://sonoperfume.com/</a></p>
			</div>
		</div>`;
      hanhdlemailer.sendmail(account.email, subject, htmlcontent);
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
module.exports.Login = async (req, res) => {
  try {
    const email = req.query.email;
    const pass = req.query.password;

    let result = await Login(email, pass);
    if (result) {
      let token = jwt.sign(email, process.env.TOKEN_KEY);
      return res.status(200).json({ message: "success", data: token });
    } else {
      return res.status(200).json({ message: "fail", data: "" });
    }
  } catch (error) {
    throw error;
  }
};
module.exports.changePass = async (req, res) => {
  try {
    let oldpass = req.body.oldpass;
    let newpass = req.body.newpass;
    let result = await changePass(req.cookies.token, oldpass, newpass);
    if (result) {
      return res.status(200).json({ message: "success", data: "" });
    } else {
      return res.status(200).json({ message: "fail", data: "" });
    }
  } catch (error) {
    throw error;
  }
};
module.exports.ChangeInfoAccount = async (req, res) => {
  try {
    let account = req.body;
    let result = await updateAccount(req.cookies.token, account);
    if (result) {
      let token = jwt.sign(account.email, process.env.TOKEN_KEY);
      return res.status(200).json({ message: "success", data: token });
    } else {
      return res.status(200).json({ message: "fail", data: "" });
    }
  } catch (error) {
    throw error;
  }
};
module.exports.layLaiPass = async (req, res) => {
  try {
    const email = req.body.email;
    let account = await getOneByEmail(email);
    if (!account) {
      return res.status(200).json({ message: "none", data: "" });
    }
    var emailhash = jwt.sign(account.email, process.env.TOKEN_KEY);
    var link =
      "http://" +
      req.get("Host") +
      "/account/api/verify?emailhash=" +
      emailhash;
    let subject = "Lấy lại mật khẩu tại SONO perfume";
    let htmlcontent = `Click vào link sau để đổi một mật khẩu mới: <a href="${link}">Lấy lại mật khẩu</a>`;
    hanhdlemailer.sendmail(email, subject, htmlcontent);
    return res.status(200).json({ message: "success", data: "" });
  } catch (error) {
    throw error;
  }
};
module.exports.getLayPassVerify = async (req, res) => {
  try {
    let emailhash = req.query.emailhash;
    let email = jwt.verify(emailhash, process.env.TOKEN_KEY);
    const info = await getInfo();
    res.render("page-views/sign-in-up", {
      content: "lay-pass-verify",
      data: {
        info: info,
        email,
      },
    });
  } catch (error) {
    throw error;
  }
};
module.exports.VerifyEnd = async (req, res) => {
  try {
    let data = req.body;
    let result = await createNewPass(data);
    if (result) {
      return res.status(200).json({ message: "success", data: "" });
    } else {
      return res.status(200).json({ message: "fail", data: "" });
    }
  } catch (error) {
    throw error;
  }
};
module.exports.getVisono = async (req, res) => {
  try {
    const token = req.cookies.token;
    let account = await getAccountByToken(token);
    if (account) {
      res.status(200).json({ message: "success", data: account.wallet });
    } else {
      res.status(200).json({ message: "fail", data: "" });
    }
  } catch (error) {
    throw error;
  }
};
