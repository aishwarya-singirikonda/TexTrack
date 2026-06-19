const express = require("express");

const {
  createOrder,
  getOrders,
  updateOrderStatus,
  getRecentOrders,
  getSalesReport,
} = require("../controllers/orderController");

const router = express.Router();

router.post("/", createOrder);

router.get("/", getOrders);

router.get("/recent", getRecentOrders);

router.get("/report", getSalesReport);

router.put("/:id", updateOrderStatus);

module.exports = router;