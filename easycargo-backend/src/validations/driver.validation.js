const Joi = require('joi');

const driverValidationSchema = Joi.object({
  id: Joi.number().required(), // ID do usuário que será o motorista
  licenseNumber: Joi.string().required(),
  averageRating: Joi.number().min(0).max(5).optional(),
});

module.exports = { driverValidationSchema };
