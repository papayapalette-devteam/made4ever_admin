const mongoose = require("mongoose");

const msp_data = new mongoose.Schema(
  {
    name: {type: String},
    email: { type: String},
    password: { type: String},
    mobile_number: { type: Number},
    registered_business_name: { type: String},
    address:{type:String},
    id:{type:Array}
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("msp", msp_data);
