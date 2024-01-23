const jwt = require("jsonwebtoken");
const { StatusCodes: httpStatus } = require("http-status-codes");
const createError = require("http-errors");
const { productValidator } = require("./validator/product.validator");
const { productModedel } = require("../model/product");
const { pushToQueue, createQueue } = require("../config/rabbitMQ");

class productCOntroler {
  async createProduct(req, res, next) {
    try {
      const { name, description, price } = req.body;
      await productValidator.validateAsync(req.body);
      const createProduct = await productModedel.create({
        name,
        description,
        price,
      });
      if (!createProduct)
        throw createError.InternalServerError("failed please try again");
      return res.status(httpStatus.CREATED).json({
        statusCode: httpStatus.CREATED,
        data: {
          message: "product created cuccessfully",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async buyProducts(req, res, next) {
    try {
      const { productIDs = [] } = req.body;
      const { email } = req.user;
      // find all products with productIDs
      const products = await productModedel.find({ _id: { $in: productIDs } });
      // send datas
      await pushToQueue("ORDER", { products, userEmail: email });
      const channel = await createQueue("PRODUCT");
      channel.consume("PRODUCT", (msg) => {
        // console.log(JSON.parse(msg.content.toString()));
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async createssProduct(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  productController: new productCOntroler(),
};
