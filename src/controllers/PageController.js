const { getInfo } = require("../services/_infoService");
const {
  getProductHome,
  getAllProduct,
  getOneBySlug,
} = require("../services/_productService");
const { getAllBrand } = require("../services/_brandService");
const { getAccountByToken } = require("../services/_accountService");
var jwt = require("jsonwebtoken");
module.exports.getHome = async (req, res) => {
  try {
    let account = "";
    if (req.cookies.token) {
      account = await getAccountByToken(req.cookies.token);
    } else {
      account = "";
    }

    const info = await getInfo();
    const products_nam = await getProductHome("Nam");
    let products_nu = await getProductHome("Nữ");
    // đổi tiền sang dạng có dấu chấm
    products_nu = products_nu.map((product) => {
      let newCost = product.cost.toLocaleString("en").replace(/\,/g, ".");
      let newOldCost = product.oldcost.toLocaleString("en").replace(/\,/g, ".");
      let newRefundCost = product.refundcost
        .toLocaleString("en")
        .replace(/\,/g, ".");
      product.cost = undefined;
      product.oldcost = undefined;
      product.refundcost = undefined;
      // chỗ này nó phải lưu kiểu này chứ gán trực tiếp là nó lưu địa chỉ nhớ
      let newProduct = { ...product }._doc;
      newProduct.cost = newCost;
      newProduct.oldcost = newOldCost;
      newProduct.refundcost = newRefundCost;
      return newProduct;
    });
    const products_unisex = await getProductHome("Unisex");
    res.render("page-views/home", {
      content: "home",
      data: {
        account: account,
        info: info,
        products_nam: products_nam,
        products_nu: products_nu,
        products_unisex: products_unisex,
      },
    });
  } catch (error) {
    throw error;
  }
};
module.exports.getProducts = async (req, res) => {
  try {
    // lấy số page
    let page = req.query.page;
    if (typeof page === "undefined") {
      page = 1;
    }
    delete req.query.page;
    // lấy brand
    let brand = req.query.thuongHieu;
    if (typeof brand === "undefined") {
      brand = "none";
    }
    // lấy name
    let name = req.query.name;
    if (typeof name === "undefined") {
      name = "none";
    }
    // lấy gender
    let gender = req.query.gender;
    if (typeof gender === "undefined") {
      gender = "none";
    }
    // lấy cost
    let cost = req.query.cost;
    if (typeof cost === "undefined") {
      cost = "none";
    }
    switch (cost) {
      case "1":
        req.query.min = 1;
        req.query.max = 200000;
        delete req.query.cost;
        break;
      case "2":
        req.query.min = 200000;
        req.query.max = 350000;
        delete req.query.cost;
        break;
      case "3":
        req.query.min = 350000;
        req.query.max = 500000;
        delete req.query.cost;
        break;
      case "4":
        req.query.min = 500000;
        req.query.max = 700000;
        delete req.query.cost;
        break;
      case "5":
        req.query.min = 700000;
        req.query.max = 999900000;
        delete req.query.cost;
        break;
      default:
        delete req.query.cost;
    }
    // lấy sort
    let sort = req.query.sort;
    if (typeof sort === "undefined") {
      sort = "none";
    }
    delete req.query.sort;
    let account = "";
    if (req.cookies.token) {
      account = await getAccountByToken(req.cookies.token);
    } else {
      account = "";
    }
    const info = await getInfo();
    const brands = await getAllBrand();
    let products = await getAllProduct(req.query, page, 16, sort);
    // đổi tiền sang dạng có dấu chấm
    products.result = products.result.map((product) => {
      let newCost = product.cost.toLocaleString("en").replace(/\,/g, ".");
      let newOldCost = product.oldcost.toLocaleString("en").replace(/\,/g, ".");
      let newRefundCost = product.refundcost
        .toLocaleString("en")
        .replace(/\,/g, ".");
      product.cost = undefined;
      product.oldcost = undefined;
      product.refundcost = undefined;
      // chỗ này nó phải lưu kiểu này chứ gán trực tiếp là nó lưu địa chỉ nhớ
      let newProduct = { ...product }._doc;
      newProduct.cost = newCost;
      newProduct.oldcost = newOldCost;
      newProduct.refundcost = newRefundCost;
      return newProduct;
    });
    res.render("page-views/products", {
      content: "products",
      data: {
        account: account,
        info: info,
        brands: brands,
        brand: brand,
        name: name,
        gender: gender,
        cost: cost,
        sort: sort,
        products: products.result,
        lengthPage: products.lengthPage,
        page: page,
      },
    });
  } catch (error) {
    throw error;
  }
};
module.exports.getOneProductBySlug = async (req, res) => {
  try {
    let account = "";
    if (req.cookies.token) {
      account = await getAccountByToken(req.cookies.token);
    } else {
      account = "";
    }

    const info = await getInfo();
    const slug = req.params.slug;
    let product = await getOneBySlug(slug);
    let newCost = product.cost.toLocaleString("en").replace(/\,/g, ".");
    let newOldCost = product.oldcost.toLocaleString("en").replace(/\,/g, ".");
    let newRefundCost = product.refundcost
      .toLocaleString("en")
      .replace(/\,/g, ".");
    product.cost = undefined;
    product.oldcost = undefined;
    product.refundcost = undefined;
    let newProduct = { ...product }._doc;

    newProduct.cost = newCost;
    newProduct.oldcost = newOldCost;
    newProduct.refundcost = newRefundCost;
    res.render("page-views/product-detail", {
      content: "product-detail",
      data: { account, info, product: newProduct },
    });
  } catch (error) {
    throw error;
  }
};
module.exports.getSignUp = async (req, res) => {
  try {
    const info = await getInfo();
    res.render("page-views/sign-in-up", {
      content: "sign-up",
      data: {
        info: info,
      },
    });
  } catch (error) {
    throw error;
  }
};
module.exports.getSignIn = async (req, res) => {
  try {
    const info = await getInfo();
    res.render("page-views/sign-in-up", {
      content: "sign-in",
      data: {
        info: info,
      },
    });
  } catch (error) {
    throw error;
  }
};
module.exports.getLayPass = async (req, res) => {
  try {
    const info = await getInfo();
    res.render("page-views/sign-in-up", {
      content: "lay-pass",
      data: {
        info: info,
      },
    });
  } catch (error) {
    throw error;
  }
};
module.exports.getAccountPage = async (req, res) => {
  try {
    let account = "";
    if (req.cookies.token) {
      account = await getAccountByToken(req.cookies.token);
    } else {
      account = "";
    }
    const info = await getInfo();
    res.render("page-views/account", {
      content: "account",
      data: {
        account: account,
        info: info,
      },
    });
  } catch (error) {
    throw error;
  }
};
module.exports.getCartPage = async (req, res) => {
  try {
    let account = "";
    if (req.cookies.token) {
      account = await getAccountByToken(req.cookies.token);
    } else {
      account = "";
    }

    const info = await getInfo();
    res.render("page-views/cart", {
      content: "cart",
      data: {
        account: account,
        info: info,
      },
    });
  } catch (error) {
    throw error;
  }
};
module.exports.getThanhToan = async (req, res) => {
  try {
    let account = "";
    if (req.cookies.token) {
      account = await getAccountByToken(req.cookies.token);
    } else {
      account = "";
    }
    res.render("page-views/thanh-toan", {
      content: "thanhtoan",
      data: { account },
    });
  } catch (error) {
    throw error;
  }
};
