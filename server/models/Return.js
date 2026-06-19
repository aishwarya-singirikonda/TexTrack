const mongoose = require("mongoose");

const returnSchema = new mongoose.Schema(
  {
    customer: {
      type: String,
      required: true,
    },

    productName: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    reason: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Return", returnSchema);