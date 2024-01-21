const joi = require("@hapi/joi");

const productValidator = joi.object({
  name: joi.string().min(3).error(new Error("name must be at least 3 chars")),
  description: joi
    .string()
    .min(3)
    .error(new Error("description must be at least 3 chars")),
  price: joi.string().min(1).error(new Error("price can not be empty")),
});

module.exports = {
    productValidator
}