const { getInfo } = require("../services/_infoService");
const { getProductHome } = require("../services/_productService");
module.exports.getHome = async (req, res) => {
  try {
    const info = await getInfo();
    const products_nam = await getProductHome("Nam");
    let products_nu = await getProductHome("Nữ");
    products_nu = products_nu.map((product) => {
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
      console.log(product);
      console.log(newProduct);
      return newProduct;
    });
    const products_unisex = await getProductHome("Unisex");
    res.render("page-views/home", {
      content: "dashboard",
      data: {
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
