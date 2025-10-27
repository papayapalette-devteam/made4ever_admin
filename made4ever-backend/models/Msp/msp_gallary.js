const mongoose = require("mongoose");

const MspGallary = new mongoose.Schema(
  {
  
    msp_gallary:{type:Array}
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("MspGallary", MspGallary);
