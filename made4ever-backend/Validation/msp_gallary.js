const Joi = require("joi");
const mongoose = require("mongoose"); // ✅ Required if you use ObjectId somewhere

const mspGallaryValidationSchema = Joi.object({

  msp_gallary: Joi.array().items(
    Joi.string().required().messages({
      "string.empty": "Image URL or path is required",
    })
  ).required().messages({
    "array.base": "Images must be provided in an array",
    "array.empty": "At least one image is required",
  }),


});

module.exports = mspGallaryValidationSchema;
