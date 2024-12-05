const Joi = require('joi');

const vehicleValidationSchema = Joi.object({
  ownerId: Joi.number().required(),
  type: Joi.string().valid('carreta', 'cavalinho', 'furgão', 'caçamba', 'pipa', 'tanque', 'barco', 'navio').required(),
  brand: Joi.string().optional(),
  modelDescription: Joi.string().required(),
  year: Joi.number().min(1900).max(new Date().getFullYear()).required(),
  registrationNumber: Joi.string().required(),
  registrationAddress: Joi.string().required(),
});

module.exports = { vehicleValidationSchema };
