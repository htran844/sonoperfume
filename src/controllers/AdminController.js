const { getAllProduct, getOneByID } = require("../services/_productService");
const {
  getListAccount,
  getOneAccountByID,
} = require("../services/_accountService");
const { getInfo } = require("../services/_infoService");
const { getAllBrand } = require("../services/_brandService");
module.exports.getAdminDashboard = async (req, res) => {
  try {
    res.render("admin-views/admin-base", {
      content: "dashboard",
      data: {},
    });
  } catch (error) {
    throw error;
  }
};
module.exports.getAdminProduct = async (req, res) => {
  try {
    let page = req.query.page;
    if (typeof page === "undefined") {
      page = 1;
    }
    delete req.query.page;
    let name = req.query.name;
    let gender = req.query.gender;
    let result = await getAllProduct(req.query, page, 5);

    let nameShow = `&name=${name}`;
    if (typeof name === "undefined") {
      nameShow = "";
      name = "";
    }
    let genderShow = `&gender=${gender}`;
    if (typeof req.query.gender === "undefined") {
      genderShow = "";
      gender = "";
    }
    if (!result.result) {
      console.log("loi");
    } else {
      res.render("admin-views/admin-base", {
        content: "products",
        data: {
          lengthPage: result.lengthPage,
          products: result.result,
          page: page,
          name: nameShow,
          gender: genderShow,
          nameSearch: name,
          genderSearch: gender,
        },
      });
    }
  } catch (error) {
    throw error;
  }
};
module.exports.getAdminAddProduct = async (req, res) => {
  try {
    res.render("admin-views/admin-base", {
      content: "add-product",
      data: {},
    });
  } catch (error) {
    throw error;
  }
};
module.exports.getAdminEditProduct = async (req, res) => {
  try {
    const _id = req.params.id;

    let result = await getOneByID(_id);
    // res.json(result);
    if (!result) {
      res.status(400).json({
        status: "fail",
        message: "Lỗi server",
      });
    } else {
      res.render("admin-views/admin-base", {
        content: "edit-product",
        data: result,
      });
    }
  } catch (error) {
    throw error;
  }
};
module.exports.getAdminAccounts = async (req, res) => {
  try {
    // lay gia tri page de dung cho servie phan trang
    let page = req.query.page;
    // luc moi truy cap trang thi set page =1
    if (typeof page === "undefined") {
      page = 1;
    }
    let email = req.query.email;
    // truyen req.query de truy van nhu 1 object
    let result = await getListAccount(email, page);
    //res.json(result);
    // dung bien mailshow de tra ve giao dien dung cho pagination
    let mailShow = `&email=${email}`;
    if (typeof email === "undefined") {
      mailShow = "";
      email = "";
    }
    if (!result.accounts) {
      console.log("loi");
    } else {
      res.render("admin-views/admin-base", {
        content: "accounts",
        data: {
          lengthPage: result.lengthPage,
          accounts: result.accounts,
          page: page,
          email: email,
          emailSearch: mailShow,
        },
      });
    }
  } catch (error) {
    throw error;
  }
};
module.exports.getAdminOneAccount = async (req, res) => {
  try {
    const id = req.params._id;
    res.render("admin-views/admin-base", {
      content: "accounts",
      data: {},
    });
  } catch (error) {
    throw error;
  }
};
module.exports.getAdminInfo = async (req, res) => {
  try {
    const info = await getInfo();
    res.render("admin-views/info-base", {
      content: "info",
      data: info,
    });
  } catch (error) {
    throw error;
  }
};
module.exports.getAdminBrand = async (req, res) => {
  try {
    const brands = await getAllBrand();
    res.render("admin-views/info-base", {
      content: "brands",
      data: brands,
    });
  } catch (error) {
    throw error;
  }
};
