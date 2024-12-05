const Joi = require('joi');

const driverDocumentValidationSchema = Joi.object({
  userId: Joi.number().required(),
  documentTypeId: Joi.number().required(),
  documentImage: Joi.binary().required(),
  expirationDate: Joi.date().required(),
});

module.exports = { driverDocumentValidationSchema };
