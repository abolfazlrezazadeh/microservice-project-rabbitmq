const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
});

module.exports = {
  prosuctModedl: mongoose.model("product", productSchema),
};
