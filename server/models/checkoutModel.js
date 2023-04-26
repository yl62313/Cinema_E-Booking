const mongoose = require("mongoose");

const checkoutSchema = new mongoose.Schema(
  {
    show: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "shows",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    seats: {
      type: Array,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    promotion: {
      type: String,
    },
    transactionId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("checkouts", checkoutSchema);