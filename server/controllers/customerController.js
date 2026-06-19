const Customer = require("../models/Customer");

// Add Customer
const addCustomer = async (req, res) => {
  try {
    const customer = await Customer.create(req.body);

    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Customers
const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({
      createdAt: -1,
    });

    res.json(customers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Customer
const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(customer);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Customer
const deleteCustomer = async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);

    res.json({
      message: "Customer deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
};