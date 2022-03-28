const OrderModel = require("../models/OrderModel");

exports.createOrder = async (order) => {
  try {
    return await OrderModel.create(order);
  } catch (error) {
    throw error;
  }
};

exports.updateOrder = async (orderId, order) => {
  try {
    return await OrderModel.findByIdAndUpdate({ _id: orderId }, { ...order });
  } catch (error) {
    throw error;
  }
};
exports.getOneOrderById = async (orderId) => {
  try {
    return await OrderModel.findOne({ _id: orderId }).populate("accountId");
  } catch (error) {
    throw error;
  }
};
exports.getAllOrder = async (email, phone, page, PAGE_SIZE, status) => {
  try {
    if (email && phone) {
      let lengthPage = await OrderModel.find({
        email: { $regex: email, $options: "i" },
        phone: { $regex: phone, $options: "i" },
        ...status,
      }).countDocuments();
      let result = await OrderModel.find({
        email: { $regex: email, $options: "i" },
        phone: { $regex: phone, $options: "i" },
        ...status,
      })
        .skip(PAGE_SIZE * (page - 1))
        .limit(PAGE_SIZE)
        .sort({ createdAt: -1 });
      return { lengthPage, result };
    } else if (email) {
      let lengthPage = await OrderModel.find({
        email: { $regex: email, $options: "i" },
        ...status,
      }).countDocuments();
      let result = await OrderModel.find({
        email: { $regex: email, $options: "i" },
        ...status,
      })
        .skip(PAGE_SIZE * (page - 1))
        .limit(PAGE_SIZE)
        .sort({ createdAt: -1 });
      return { lengthPage, result };
    } else if (phone) {
      let lengthPage = await OrderModel.find({
        phone: { $regex: phone, $options: "i" },
        ...status,
      }).countDocuments();
      let result = await OrderModel.find({
        phone: { $regex: phone, $options: "i" },
        ...status,
      })
        .skip(PAGE_SIZE * (page - 1))
        .limit(PAGE_SIZE)
        .sort({ createdAt: -1 });
      return { lengthPage, result };
    } else {
      let lengthPage = await OrderModel.find({ ...status }).countDocuments();
      let result = await OrderModel.find({ ...status })
        .skip(PAGE_SIZE * (page - 1))
        .limit(PAGE_SIZE)
        .sort({ createdAt: -1 });
      return { lengthPage, result };
    }
  } catch (error) {
    throw error;
  }
};
exports.changeStatusDelivery = async (orderId) => {
  try {
    return await OrderModel.findByIdAndUpdate(
      { _id: orderId },
      { status: "delivery" }
    );
  } catch (error) {
    throw error;
  }
};
exports.changeStatusCancel = async (orderId) => {
  try {
    return await OrderModel.findByIdAndUpdate(
      { _id: orderId },
      { status: "cancel" }
    );
  } catch (error) {
    throw error;
  }
};
exports.changeStatusRefund = async (orderId) => {
  try {
    return await OrderModel.findByIdAndUpdate(
      { _id: orderId },
      { status: "refund" }
    );
  } catch (error) {
    throw error;
  }
};
exports.changeStatusSuccess = async (orderId) => {
  try {
    return await OrderModel.findByIdAndUpdate(
      { _id: orderId },
      { status: "success" }
    );
  } catch (error) {
    throw error;
  }
};
