const Joi = require("joi");

// Personal Details Schema
const personalDetailsSchema = Joi.object({
  Name: Joi.string().allow(""),
  DateOfBirth: Joi.string().allow(""),
  TimeOfBirth: Joi.string().allow(""),
  PlaceOfBirth: Joi.string().allow(""),
  Age: Joi.number().allow(""),
  MobileNumber: Joi.number().allow(""),
  Complexion: Joi.string().allow(""),
  Height: Joi.string().allow(""),
  Weight: Joi.string().allow(""),
  MotherTongue: Joi.string().allow(""),
  Gender: Joi.string().allow(""),
  Drinking: Joi.string().allow(""),
  NonVeg: Joi.string().allow(""),
  Manglik: Joi.string().allow(""),
  Living: Joi.string().allow(""),
  AnyDisability: Joi.string().allow(""),
  MaritalStatus: Joi.string().allow("")
});

// Religious Details Schema
const religiousDetailsSchema = Joi.object({
  Community: Joi.string().allow(""),
  Caste: Joi.string().allow(""),
  Religion: Joi.string().allow(""),
  Gothram: Joi.string().allow("")
});


const userProfileSchema = Joi.object({
  PersonalDetails: personalDetailsSchema,
  ReligiousDetails: religiousDetailsSchema
});


module.exports=userProfileSchema