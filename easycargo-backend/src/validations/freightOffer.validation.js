const Joi = require('joi');

const freightOfferValidationSchema = Joi.object({
  companyId: Joi.number().required(),
  loadingLocationId: Joi.number().required(),
  cargoType: Joi.string().required(),
  cargoWeight: Joi.number().required(),
  requiresSpecialDocuments: Joi.boolean().required(),
  vehicleAvailability: Joi.string().valid('sim', 'não', 'somente carreta', 'somente cavalinho').required(),
  freightValue: Joi.number().positive().required(),
  departureDate: Joi.date().required(),
  deliveryDate: Joi.date().required(),
  deliveryAddress: Joi.string().required(),
});

module.exports = { freightOfferValidationSchema };
