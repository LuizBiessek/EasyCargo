const Joi = require('joi');

const companyValidationSchema = Joi.object({
  id: Joi.number().required(), // ID do usuário associado
  businessName: Joi.string().required(),
});

module.exports = { companyValidationSchema };
