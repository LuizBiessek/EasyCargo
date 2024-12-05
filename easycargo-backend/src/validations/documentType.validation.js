const Joi = require('joi');

const documentTypeValidationSchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = { documentTypeValidationSchema };
