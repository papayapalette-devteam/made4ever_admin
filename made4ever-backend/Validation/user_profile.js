const Joi = require("joi");

// ✅ Personal Details Schema
const personalDetailsSchema = Joi.object({
  Name: Joi.string().allow(""),
  DateOfBirth: Joi.string().allow(""),
  TimeOfBirth: Joi.string().allow(""),
  PlaceOfBirth: Joi.string().allow(""),
  Age: Joi.number().allow(""),
  Complexion: Joi.string().allow(""),
  Height: Joi.string().allow(""),
  Weight: Joi.string().allow(""),
  MotherTongue: Joi.string().allow(""),
  Gender: Joi.string().allow(""),
  Drinking: Joi.string().allow(""),
  Smoking: Joi.string().allow(""),
  Nri: Joi.string().allow(""),
  PermanentResident: Joi.boolean().default(false),
  TemporaryResident: Joi.boolean().default(false),
  NonVeg: Joi.string().allow(""),
  Manglik: Joi.string().allow(""),
  Living: Joi.string().allow(""),
  AnyDisability: Joi.string().allow(""),
  MaritalStatus: Joi.string().allow(""),
  HasChildren: Joi.boolean().allow("",null),
  ChildrenCount:Joi.number().allow(null)
});

// ✅ Religious Details Schema
const religiousDetailsSchema = Joi.object({
  Community: Joi.string().allow(""),
  Caste: Joi.string().allow(""),
  Religion: Joi.string().allow(""),
  Gothram: Joi.string().allow("")
});

// ✅ Family Details Schema
const familyDetailsSchema = Joi.object({
  FatherName: Joi.string().allow(""),
  MotherName: Joi.string().allow(""),
  FatherOccupation: Joi.string().allow(""),
  MotherOccupation: Joi.string().allow(""),
  NoOfSiblings: Joi.number().allow(""),
  FamilyType: Joi.string().allow(""),
  FamilyDescription: Joi.string().allow("")
});

// ✅ Education Details Schema
const educationDetailsSchema = Joi.object({
  HighestEducation: Joi.string().allow(""),
  EducationSpecialization: Joi.string().allow(""),
  Occupation: Joi.string().allow(""),
  AnnualFamilyIncome: Joi.string().allow(""),
  PersonalIncome: Joi.string().allow(""),
  EducationDetails: Joi.string().allow(""),
  OccupationDetails: Joi.string().allow("")
});

// ✅ Contact Details Schema
const contactDetailsSchema = Joi.object({
  ParmanentAddress: Joi.string().allow(""),
  Country: Joi.string().allow(""),
  State: Joi.string().allow(""),
  City: Joi.string().allow(""),
  PostalCode: Joi.number().allow(null)
});

// ✅ Partner Preferences Schema
const partnerPrefrencesSchema = Joi.object({
  AgeRange: Joi.object({
    MinAge: Joi.number().allow(null),
    MaxAge: Joi.number().allow(null)
  }),
  HeightRange: Joi.object({
    MinHeight: Joi.string().allow(null),
    MaxHeight: Joi.string().allow(null)
  }),
  MaritialStatus: Joi.string().allow(""),
  HasChildren: Joi.boolean().allow(""),     
  ChildrenCount: Joi.number().allow(null),
  NonVeg: Joi.string().allow(""),
  Manglik: Joi.string().allow(""),
  Nri: Joi.string().allow(""),
  PermanentResident: Joi.boolean().default(false),
  TemporaryResident: Joi.boolean().default(false),
  Community: Joi.string().allow(""),
  Religion: Joi.string().allow(""),
  Caste: Joi.array().items(Joi.string().allow("")),
  Gothram: Joi.array().items(Joi.string().allow("")),
  MotherTongue: Joi.array().items(Joi.string().allow("")),
  AnnualFamilyIncome: Joi.string().allow(""),
  PersonalIncome: Joi.string().allow(""),
  PropertySize: Joi.array().items(Joi.string().allow("")),
  HeighstEducation: Joi.array().items(Joi.string().allow("")),
  Occupation: Joi.array().items(Joi.string().allow("")),
  Country: Joi.array().items(Joi.string().allow("")),
  State: Joi.array().items(Joi.string().allow("")),
  City: Joi.array().items(Joi.string().allow(""))
});

// ✅ Upload Schema
const uploadSchema = Joi.object({
  ProfilePhoto: Joi.array().items(Joi.string().allow("")),
  IdentityType: Joi.string().allow(""),
  IdentityNumber: Joi.number().allow(null,"").optional(),
  IdentityImage: Joi.array().items(Joi.string().allow("")),
  AudioVideo: Joi.array().items(Joi.string().allow("")),
  Gallary: Joi.array().items(Joi.string().allow(""))
});

// ✅ Property Details Schema
const propertyDetailsSchema = Joi.object({
  PropertyType: Joi.string().allow(""),
  ResidentialType: Joi.string().allow(""),
  PropertySize: Joi.string().allow(""),
  PropertyDescription: Joi.string().allow(""),
  AcceptTerms: Joi.boolean().default(false),
});

// ✅ Full User Profile Schema
const userProfileSchema = Joi.object({
  Bureau: Joi.string().required(),
  PersonalDetails: personalDetailsSchema.required(),
  ReligiousDetails: religiousDetailsSchema.required(),
  FamilyDetails: familyDetailsSchema.required(),
  EducationDetails: educationDetailsSchema.required(),
  ContactDetails: contactDetailsSchema.required(),
  PartnerPrefrences: partnerPrefrencesSchema.required(),
  Upload: uploadSchema.optional(),
  PropertyDetails: propertyDetailsSchema.required(),
  IsActive: Joi.boolean().default(true),
  IsDeleted: Joi.boolean().default(false),
  DeletedAt: Joi.date().allow(null).default(null),
});

module.exports = userProfileSchema;
