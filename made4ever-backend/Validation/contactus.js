const Joi = require("joi");

const contactusValidationSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .required()
    .messages({
      "string.empty": "Full name is required",
      "string.min": "Full name must be at least 3 characters",
      "any.required": "Full name is required",
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.empty": "Email address is required",
      "string.email": "Please enter a valid email address",
      "any.required": "Email address is required",
    }),

  phone: Joi.string()
    .min(8)
    .required()
    .messages({
      "string.empty": "Phone number is required",
      "string.min": "Phone number must be at least 8 digits",
      "any.required": "Phone number is required",
    }),

  subject: Joi.string()
    .allow("")
    .messages({
      "string.base": "Subject must be a valid string",
    }),



  message: Joi.string()
    .allow("")
    .messages({
      "string.base": "Message must be a valid text",
    }),
});

module.exports = { contactusValidationSchema };
