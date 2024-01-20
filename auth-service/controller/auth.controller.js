const { userModel } = require("../model/user");
const controller = require("./controller");
const { StatusCodes: httpStatus } = require("http-status-codes");
const createError = require("http-errors");
const { validateEmail } = require("./validator/auth.validator");
class authController {
  async registerUser(req, res, next) {
    try {
      const { name, email, password } = req.body;
      await validateEmail.validateAsync(req.body);
      // find user
      const existUser = await userModel.findOne({ email });
      if (existUser) throw createError.BadRequest("user is already exist");
      // create 
      const userRegistred = await userModel.create({ name, email, password });
      if (!userRegistred)
        throw createError.InternalServerError("please try again");
      return res.status(httpStatus.CREATED).json({
        statusCode: httpStatus.CREATED,
        data: {
          message: "user created successfuly",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async loginUser(req, res, user) {
    try {
    } catch (error) {
      next(error);
    }
  }
}


module.exports = {
    authController : new authController()
}