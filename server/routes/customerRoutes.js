const express = require("express");

const {
  addCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerController");

const router = express.Router();

router.post("/", addCustomer);

router.get("/", getCustomers);

router.put("/:id", updateCustomer);

router.delete("/:id", deleteCustomer);

module.exports = router;