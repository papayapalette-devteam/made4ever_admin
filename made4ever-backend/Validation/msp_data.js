const Joi = require("joi");
const mongoose = require("mongoose"); // ✅ Required if you use ObjectId somewhere

const mspValidationSchema = Joi.object({

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

  registered_business_name: Joi.string().optional().messages({
    "string.empty": "Registered business name is required",
  }),

  address: Joi.string().required().messages({
    "string.empty": "Address is required",
  }),

  images: Joi.array().items(
    Joi.string().required().messages({
      "string.empty": "Image URL or path is required",
    })
  ).required().messages({
    "array.base": "Images must be provided in an array",
    "array.empty": "At least one image is required",
  }),

  is_active: Joi.boolean().default(true),

  other: Joi.object().optional(),

    // ⭐ NEW FIELDS (OPTIONAL)
  credits: Joi.number().default(0), // user starts with 0 credits
  current_plan: Joi.string().optional().allow(""),
  subscription_valid_till: Joi.date().optional().allow(null),

  
});

module.exports = mspValidationSchema;
