const controller = require("./controller");

class productController extends controller {
  async registerUser(req, res, user) {
    try {
        const {name, email, password} = req.body;
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
//   async existUser(email) {
//     const existUser = await
//   }
}
