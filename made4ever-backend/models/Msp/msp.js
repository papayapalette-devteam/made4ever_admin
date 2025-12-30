const mongoose = require("mongoose");

const msp_data = new mongoose.Schema(
  {
    name: {type: String},
    email: { type: String},
    password: { type: String},
    mobile_number: { type: Number},
    registered_business_name: { type: String},
    address:{type:String},
    images:{type:Array},

        // ⭐ New field for credits
    credits: { type: Number, default: 0 }, 
    
    // (Optional) Track subscription expiry
    subscription_valid_till: { type: Date, default: null },

    // (Optional) Store current plan
    current_plan: { type: String, default: "" }
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("msp", msp_data);
