const Joi = require("joi");
const mongoose = require("mongoose");

// Joi schema for admin_lookups
const lookup_validation_schema = Joi.object({
    lookup_id: Joi.string()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message('"parent_lookup_id" must be a valid ObjectId');
      }
      return value;
    })
    .allow(null,"")
    .optional(),

  lookup_type: Joi.string().trim().required().messages({
    "string.base": `"lookup_type" should be a type of 'text'`,
    "string.empty": `"lookup_type" cannot be empty`,
    "any.required": `"lookup_type" is required`,
  }),

  lookup_value: Joi.string().trim().required().messages({
    "string.base": `"lookup_value" should be a type of 'text'`,
    "string.empty": `"lookup_value" cannot be empty`,
    "any.required": `"lookup_value" is required`,
  }),

  parent_lookup_id: Joi.string()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message('"parent_lookup_id" must be a valid ObjectId');
      }
      return value;
    })
    .allow(null,"")
    .optional(),

  is_active: Joi.boolean().optional(),

  other: Joi.object().optional(),
});

module.exports = lookup_validation_schema;
