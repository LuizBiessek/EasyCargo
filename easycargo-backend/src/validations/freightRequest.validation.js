const Joi = require('joi');

const freightRequestValidationSchema = Joi.object({
  freightOfferId: Joi.number().required(),
  driverId: Joi.number().required(),
  status: Joi.string().valid('aguardando', 'confirmada', 'negada').required(),
});

module.exports = { freightRequestValidationSchema };
