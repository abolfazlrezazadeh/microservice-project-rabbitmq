const { isAuth } = require("../../isAuthenticated");
const { productController } = require("../controller/product.controller");

const router = require("express").Router();

router.post("/create", productController.createProduct);

router.post("/buy", isAuth, productController.buyProducts);

module.exports = {
  productRouter: router,
};
