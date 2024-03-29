const joi = require("@hapi/joi");

const validateEmail = joi.object({
  email: joi
    .string()
    .min(3)
    .pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
    .error(new Error("email in not correct")),
  password: joi.string().min(3).error(new Error("password cannot be empty")),
});

module.exports = {
  validateEmail,
};
