const mongoose = require("mongoose");

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

const UserProfileSchema = new mongoose.Schema(
  {
    PersonalDetails: { type: PersonalDetailsSchema, required: true },
    ReligiousDetails: { type: ReligiousDetailsSchema, required: true }
  },
  { timestamps: true } // adds createdAt & updatedAt
);

module.exports= mongoose.model("UserProfile", UserProfileSchema);
