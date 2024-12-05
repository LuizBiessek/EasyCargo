const Joi = require('joi');

const userValidationSchema = Joi.object({
  name: Joi.string().required(),
  cpfCnpj: Joi.string().length(14).required(),
  street: Joi.string().required(),
  number: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  country: Joi.string().required(),
  zipCode: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

module.exports = { userValidationSchema };
