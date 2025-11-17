const Joi = require("joi");
const mongoose = require("mongoose"); // ✅ Required if you use ObjectId somewhere

const subadminValidationSchema = Joi.object({

  name: Joi.string().required().messages({
    "string.empty": "Name is required",
  }),

  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    "string.empty": "Email is required",
    "string.email": "Please enter a valid email address",
  }),

  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),

  mobile_number: Joi.number().required().messages({
    "number.empty": "Mobile number is required",
  }),

  id: Joi.array().items(
    Joi.string().required().messages({
      "string.empty": "Image URL or path is required",
    })
  ).required().messages({
    "array.base": "Images must be provided in an array",
    "array.empty": "At least one image is required",
  }),

  is_active: Joi.boolean().default(true),

  other: Joi.object().optional(),
});

module.exports = subadminValidationSchema;
