const Return = require("../models/Return");
const Product = require("../models/Product");

// Create Return
const createReturn = async (req, res) => {
  try {
    const { customer, productName, quantity, reason } =
      req.body;

    const returnedItem = await Return.create({
      customer,
      productName,
      quantity,
      reason,
    });

    const product = await Product.findOne({
      name: productName,
    });

    if (product) {
      product.stock += quantity;
      await product.save();
    }

    res.status(201).json(returnedItem);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Returns
const getReturns = async (req, res) => {
  try {
    const returns = await Return.find().sort({
      createdAt: -1,
    });

    res.json(returns);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createReturn,
  getReturns,
};