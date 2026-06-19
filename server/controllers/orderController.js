const Order = require("../models/Order");
const Product = require("../models/Product");

// Create Order
const createOrder = async (req, res) => {
  try {
    const { customer, items, totalAmount } = req.body;

    const order = await Order.create({
      customer,
      items,
      totalAmount,
    });

    for (const item of items) {
      const product = await Product.findOne({
        name: item.productName,
      });

      if (product) {
        product.stock -= item.quantity;
        await product.save();
      }
    }

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Order Status
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // Restore stock when cancelled
    if (
      order.status !== "Cancelled" &&
      req.body.status === "Cancelled"
    ) {
      for (const item of order.items) {
        const product = await Product.findOne({
          name: item.productName,
        });

        if (product) {
          product.stock += item.quantity;
          await product.save();
        }
      }
    }

    order.status = req.body.status;

    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Recent Orders
const getRecentOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({
        createdAt: -1,
      })
      .limit(5);

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Sales Report
const getSalesReport = async (req, res) => {
  try {
    const orders = await Order.find();

    const totalOrders = orders.length;

    const totalRevenue = orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );

    res.json({
      totalOrders,
      totalRevenue,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getOrders,
  updateOrderStatus,
  getRecentOrders,
  getSalesReport,
};