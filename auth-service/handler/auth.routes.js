const { authController } = require("../controller/auth.controller");

const router = require("express").Router();

router.post("/register" , authController.registerUser)

router.post("/login" , authController.loginUser)


module.exports={
    authRoutes : router
}