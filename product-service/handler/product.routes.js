const { productController } = require("../controller/product.controller")

const router = require("express").Router()

router.post("/create", productController.createProduct)



module.exports = {
    productRouter : router
}