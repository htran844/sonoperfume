const {
  createOrder,
  getAllOrder,
  getOneOrderById,
  updateOrder,
  changeStatusCancel,
  changeStatusDelivery,
  changeStatusRefund,
  changeStatusSuccess,
} = require("../services/_orderService");
const {
  getAccountByToken,
  resetWallet,
} = require("../services/_accountService");
module.exports.createOrder = async (req, res) => {
  try {
    const order = req.body;
    let account = await getAccountByToken(req.cookies.token);
    order.accountId = account._id;
    order.status = "waiting";
    let totalCost = 0;
    let refundcost = 0;
    // lay tong tien va tien hoan ve tai khoan
    order.listProduct.forEach((element) => {
      totalCost += element.cost * element.quantity;
      refundcost += element.refund * element.quantity;
    });
    // neu dung vi thi tru tong tien va reset vi
    if (order.visono == true) {
      totalCost = totalCost - account.wallet;
      await resetWallet(account._id);
    }

    let ship = 35000;
    totalCost = totalCost + ship;
    order.totalCost = totalCost;
    order.refundcost = refundcost;
    let result = await createOrder(order);
    if (result) {
      return res.status(200).json({ message: "success", data: result });
    } else {
      return res.status(201).json({ message: "fail", data: "" });
    }
  } catch (error) {
    throw error;
  }
};
module.exports.updateOrder = async (req, res) => {
  try {
    const order = req.body.order;
    const orderId = req.body.orderId;

    let result = await updateOrder(orderId, order);
    if (result) {
      return res.status(200).json({ message: "success", data: result });
    } else {
      return res.status(201).json({ message: "fail", data: "" });
    }
  } catch (error) {
    throw error;
  }
};
module.exports.getAllOrder = async (req, res) => {
  try {
    let data = {};
    let phone = req.query.phone;
    if (typeof phone != "undefined") {
      data.phone = phone;
    }
    let email = req.query.email;
    if (typeof email != "undefined") {
      data.email = email;
    }
    let page = req.query.page;
    // luc moi truy cap trang thi set page =1
    if (typeof page === "undefined") {
      page = 1;
    }
    let result = await getAllOrder(email, phone, page, 5);

    if (result) {
      return res.status(200).json({ message: "success", data: result.result });
    } else {
      return res.status(201).json({ message: "fail", data: "" });
    }
  } catch (error) {
    throw error;
  }
};
module.exports.getOneOrderById = async (req, res) => {
  try {
  } catch (error) {
    throw error;
  }
};
module.exports.changeStatusCancel = async (req, res) => {
  try {
  } catch (error) {
    throw error;
  }
};
module.exports.changeStatusDelivery = async (req, res) => {
  try {
  } catch (error) {
    throw error;
  }
};
module.exports.changeStatusRefund = async (req, res) => {
  try {
  } catch (error) {
    throw error;
  }
};
module.exports.changeStatusSuccess = async (req, res) => {
  try {
  } catch (error) {
    throw error;
  }
};
