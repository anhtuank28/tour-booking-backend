const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");

// Public Booking Routes
router.post("/", orderController.createOrder);
router.get("/:orderCode", orderController.getOrderDetail);

module.exports = router;
