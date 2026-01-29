const Joi = require("joi");

const feedbackValidationSchema = Joi.object({
  bureau: Joi.string()
    .required()
    .regex(/^[0-9a-fA-F]{24}$/)
    .messages({
      "string.empty": "Bureau is required",
      "string.pattern.base": "Invalid bureau ID",
    }),

  feedback: Joi.string()
    .min(5)
    .max(1000)
    .required()
    .messages({
      "string.empty": "Feedback is required",
      "string.min": "Feedback must be at least 5 characters",
      "string.max": "Feedback must be less than 1000 characters",
    }),

      image: Joi.string()
        .allow("")
        .optional()
        .messages({
          "string.base": "Image must be a string",
        }),
});

module.exports = {
  feedbackValidationSchema,
};
