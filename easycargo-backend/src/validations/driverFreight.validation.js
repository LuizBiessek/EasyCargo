const Joi = require('joi');

const driverFreightValidationSchema = Joi.object({
  freightOfferId: Joi.number().required(),
  status: Joi.string().valid('em andamento', 'concluido', 'cancelado').required(),
});

module.exports = { driverFreightValidationSchema };
