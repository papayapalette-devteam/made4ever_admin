const Joi = require("joi");
const mongoose = require("mongoose"); // ✅ Required if you use ObjectId somewhere

const mspEventImageValidationSchema = Joi.object({

  msp_event_image: Joi.array().items(
    Joi.string().required().messages({
      "string.empty": "Image URL or path is required",
    })
  ).required().messages({
    "array.base": "Images must be provided in an array",
    "array.empty": "At least one image is required",
  }),


});

module.exports = mspEventImageValidationSchema;
