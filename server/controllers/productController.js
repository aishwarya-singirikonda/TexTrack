const Product = require("../models/Product");

// Add Product
const addProduct = async (req, res) => {
  try {
    const product = await Product.create({
      name: req.body.name,
      brand: req.body.brand,
      category: req.body.category,
      price: Number(req.body.price),
      stock: Number(req.body.stock),
      size: req.body.size,
      color: req.body.color,
      image: req.file ? req.file.path : "",
    });

    res.status(201).json(product);
  } catch (error) {
    console.log("ADD PRODUCT ERROR");
    console.log(error);
    console.log(error.message);
    console.log(error.stack);

    res.status(500).json({
      message: error.message,
    });
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
    console.log("GET PRODUCT ERROR");
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const existingProduct = await Product.findById(req.params.id);

    if (!existingProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    existingProduct.name = req.body.name;
    existingProduct.brand = req.body.brand;
    existingProduct.category = req.body.category;
    existingProduct.price = Number(req.body.price);
    existingProduct.stock = Number(req.body.stock);
    existingProduct.size = req.body.size;
    existingProduct.color = req.body.color;

    if (req.file) {
      existingProduct.image = req.file.path;
    }

    await existingProduct.save();

    res.json(existingProduct);
  } catch (error) {
    console.log("UPDATE PRODUCT ERROR");
    console.log(error);
    console.log(error.message);

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
    console.log("DELETE PRODUCT ERROR");
    console.log(error);

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
    console.log("STATS ERROR");
    console.log(error);

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