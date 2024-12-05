const Joi = require('joi');

const loadingLocationValidationSchema = Joi.object({
  companyId: Joi.number().required(),
  street: Joi.string().required(),
  number: Joi.string().required(),
  neighborhood: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  country: Joi.string().required(),
  zipCode: Joi.string().required(),
});

module.exports = { loadingLocationValidationSchema };
