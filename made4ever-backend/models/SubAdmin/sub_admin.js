const mongoose = require("mongoose");

const sub_admin = new mongoose.Schema(
  {
    name: {type: String},
    email: { type: String},
    password: { type: String},
    mobile_number: { type: Number},
    id:{type:Array}
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("sub-admin", sub_admin);
