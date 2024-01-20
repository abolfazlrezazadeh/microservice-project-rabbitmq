const { authController } = require("../controller/auth.controller");

const router = require("express").Router();

router.post("/register" , authController.registerUser)


module.exports={
    authRoutes : router
}