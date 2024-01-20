const { productController } = require("../controller/product.controller");

const router = require("express").Router();

router.post("/register" , productController.registerUser)


module.exports={
    productRoute : router
}