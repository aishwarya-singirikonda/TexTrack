const Product = require("../models/Product");

// Add Product
const addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({
      createdAt: -1,
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Dashboard Stats
const getStats = async (req, res) => {
  try {
    const products = await Product.find();

    const totalProducts = products.length;

    const lowStock = products.filter(
      (product) => product.stock <= 5
    ).length;

    const totalStock = products.reduce(
      (sum, product) => sum + product.stock,
      0
    );

    const inventoryValue = products.reduce(
      (sum, product) => sum + product.price * product.stock,
      0
    );

    res.json({
      totalProducts,
      lowStock,
      totalStock,
      inventoryValue,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getStats,
};