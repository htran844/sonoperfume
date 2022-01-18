const { getAllProduct, getOneByID } = require("../services/_productService");
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
    let result = await getAllProduct(req.query, page);
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
