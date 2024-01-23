const { default: mongoose } = require("mongoose");

const orderSchema = new mongoose.Schema({
  products: [{ _id: String }],
  userEmail: String,
  totalPrice: {type : Number},
});

module.exports = {
  orderModel: mongoose.model("order", orderSchema),
};
