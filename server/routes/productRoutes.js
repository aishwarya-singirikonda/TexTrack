const express = require("express");

const {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getStats,
} = require("../controllers/productController");

const upload = require("../middleware/upload");

const router = express.Router();

router.post("/", upload.single("image"), addProduct);

router.get("/", getProducts);

router.get("/stats", getStats);

router.put("/:id", upload.single("image"), updateProduct);

router.delete("/:id", deleteProduct);

module.exports = router;