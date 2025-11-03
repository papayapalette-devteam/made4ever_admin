const mongoose = require("mongoose");
const { type } = require("../../Validation/user_profile");

const PersonalDetailsSchema = new mongoose.Schema({
  Name: { type: String, default: "" },
  DateOfBirth: { type: String, default: "" },
  TimeOfBirth: { type: String, default: "" },
  PlaceOfBirth: { type: String, default: "" },
  Age: { type: Number, default: "" },
  MobileNumber: { type: Number, default: "" },
  Complexion: { type: String, default: "" },
  Height: { type: String, default: "" },
  Weight: { type: String, default: "" },
  MotherTongue: { type: String, default: "" },
  Gender: { type: String, default: "" },
  Drinking: { type: String, default: "" },
  Smoking: { type: String, default: "" },
  Nri: { type: String, default: "" },
  NonVeg: { type: String, default: "" },
  Manglik: { type: String, default: "" },
  Living: { type: String, default: "" },
  AnyDisability: { type: String, default: "" },
  MaritalStatus: { type: String, default: "" }
});

const ReligiousDetailsSchema = new mongoose.Schema({
  Community: { type: String, default: "" },
  Caste: { type: String, default: "" },
  Religion: { type: String, default: "" },
  Gothram: { type: String, default: "" }
});

const FamilyDetailsSchema = new mongoose.Schema({
  FatherName: { type: String, default: "" },
  MotherName: { type: String, default: "" },
  FatherOccupation: { type: String, default: "" },
  MotherOccupation: { type: String, default: "" },
  NoOfSiblings: { type: Number, default: 0 },
  FamilyType: { type: String, default: "" },
  FamilyDescription: { type: String, default: "" }
});

const EducationDetailsSchema = new mongoose.Schema({
  HighestEducation: { type: String, default: "" },
  EducationSpecialization: { type: String, default: "" },
  Occupation: { type: String, default: "" },
  AnnualFamilyIncome: { type: String, default: "" },
  EducationDetails: { type: String, default: "" },
  OccupationDetails: { type: String, default: "" }
});

const ContactDetailsSchema = new mongoose.Schema({
  ParmanentAddress: { type: String, default: "" },
  Country: { type: String, default: "" },
  State: { type: String, default: "" },
  City: { type: String, default: "" },
  PostalCode: { type: Number, default: "" }
});

const PartnerPrefrencesSchema = new mongoose.Schema({
  AgeRange: { MinAge:{type:Number},MaxAge:{type:Number} },
  HeightRange: { MinHeight:{type:String},MaxHeight:{type:String}},
  MaritialStatus: { type: String, default: "" },
  NonVeg: { type: String, default: "" },
  Manglik: { type: String, default: "" },
  Nri: { type: String, default: "" },
  Community: { type: String, default: "" },
  Religion: { type: String, default: "" },
  Caste: { type: String, default: "" },
  MotherTongue: { type: String, default: "" },
  HeighstEducation: { type: Array, default: [] },
  Occupation: { type: Array, default: [] },
  Country: { type: Array, default: [] },
  State: { type: Array, default: [] },
  City: { type: Array, default: [] }
});

const UploadSchema = new mongoose.Schema({
  ProfilePhoto: { type: Array, default: [] },
  IdentityType: { type: String, default: "" },
  IdentityNumber: { type: Number, default: "" },
  IdentityImage: { type: Array, default: [] },
  AudioVideo: { type: Array, default: [] },
  Gallary: { type: Array, default: [] }
});

const PropertyDetailsSchema = new mongoose.Schema({
  PropertyType: { type: String, default: "" },
  ResidentialType: { type: String, default: "" },
  PropertyDescription: { type: String, default: "" }
});

const UserProfileSchema = new mongoose.Schema(
  {
    PersonalDetails: { type: PersonalDetailsSchema, required: true },
    ReligiousDetails: { type: ReligiousDetailsSchema, required: true },
    FamilyDetails: { type: FamilyDetailsSchema, required: true },
    EducationDetails: { type: EducationDetailsSchema, required: true },
    ContactDetails: { type: ContactDetailsSchema, required: true },
    PartnerPrefrences: { type: PartnerPrefrencesSchema, required: true },
    Upload: { type: UploadSchema, required: true },
    PropertyDetails: { type: PropertyDetailsSchema, required: true }
  },
  { timestamps: true } // adds createdAt & updatedAt
);

module.exports= mongoose.model("UserProfile", UserProfileSchema);
