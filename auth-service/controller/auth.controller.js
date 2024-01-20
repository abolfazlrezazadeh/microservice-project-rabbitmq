const { userModel } = require("../model/user");
const controller = require("./controller");
const jwt = require("jsonwebtoken")
const { StatusCodes: httpStatus } = require("http-status-codes");
const createError = require("http-errors");
const {SECRET_KEY} = process.env;
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
      const {email, password} = req.body;
      await validateEmail.validateAsync(req.body);
      const existUser = await userModel.findOne({email},{__v : 0})
      if(!existUser) throw createError.NotFound("user not found")
      if(existUser.password !== password) throw createError.BadRequest("password is not correct")
      delete existUser.password;
      jwt.sign({email,userId : existUser._id, name :existUser.name},SECRET_KEY,(err,token)=>{
        if(err) throw createError.InternalServerError("failed, please try again")
        return res.status(httpStatus.OK).json({
          statusCode : httpStatus.OK,
          data : {
            message : "login successfuly",
            token 
          }
        })
      })
    } catch (error) {
      next(error);
    }
  }
}


module.exports = {
    authController : new authController()
}