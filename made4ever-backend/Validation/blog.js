const Joi = require("joi");

const blogValidationSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(2)
    .max(200)
    .required()
    .messages({
      "string.empty": "Title is required",
      "string.min": "Title must be at least 2 characters long",
    }),

  content: Joi.string()
    .trim()
    .required()
    .messages({
      "string.empty": "Content is required",
    }),

  image: Joi.string()
    .allow("")
    .optional()
    .messages({
      "string.base": "Image must be a string",
    }),
});

module.exports = blogValidationSchema
