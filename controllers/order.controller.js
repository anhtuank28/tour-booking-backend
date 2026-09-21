const Order = require("../models/order.model");

// [POST] /api/v1/orders
const createOrder = async (req, res) => {
  try {
    const orderData = req.body;
    // Generate unique order code (e.g. TOUR-XXXXXX)
    orderData.orderCode = `TOUR-${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 100)}`;

    const newOrder = new Order(orderData);
    await newOrder.save();

    res.status(201).json({
      status: "success",
      message: "Đặt tour thành công!",
      data: newOrder,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

// [GET] /api/v1/orders/:orderCode
const getOrderDetail = async (req, res) => {
  try {
    const { orderCode } = req.params;
    const order = await Order.findOne({
      orderCode,
      deleted: false,
    });

    if (!order) {
      return res.status(404).json({
        status: "error",
        message: "Không tìm thấy đơn đặt tour",
      });
    }

    res.json({
      status: "success",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getOrderDetail,
};
