const Joi = require("joi");
const mongoose = require("mongoose"); // ✅ Required if you use ObjectId somewhere

const mspVideoValidationSchema = Joi.object({

  msp_video: Joi.array().items(
    Joi.string().required().messages({
      "string.empty": "Video URL or path is required",
    })
  ).required().messages({
    "array.base": "Video must be provided in an array",
    "array.empty": "At least one video is required",
  }),


});

module.exports = mspVideoValidationSchema;
