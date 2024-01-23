const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");

async function isAuth(req, res, next) {
  try {
    const token = req.headers?.["authorization"]?.split(" ")[0] || "";
    jwt.verify(token, "secretKey", (error, paylod) => {
      if (error) {
        return res.status(httpStatus[401]).json({
          statusCode: httpStatus[401],
          data: {
            error: error.message,
          },
        });
      }
      req.user = paylod;
      next();
    });
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      statusCode: httpStatus.UNAUTHORIZED,
      data: {
        error: error.message,
      },
    });
  }
}

module.exports={
    isAuth
}