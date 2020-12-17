const Joi = require("@hapi/joi");

const registerValidation = Joi.object({
  username: Joi.string().min(6).max(512).required().trim(),
  password: Joi.string().min(8).max(1024).required(),
  nameSurname: Joi.string().min(4).max(256).required(),
  email: Joi.string().min(4).max(256).required().trim(),
  cellNo: Joi.string().min(10).max(13).required().trim(),
});

const loginValidation = Joi.object({
  //username or email
  username: Joi.string().min(4).max(512).required().trim(),
  password: Joi.string().min(8).max(1024).required(),
});

module.exports = {
  registerValidation,
  loginValidation,
};
