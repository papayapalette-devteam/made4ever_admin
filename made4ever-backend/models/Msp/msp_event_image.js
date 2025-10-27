const mongoose = require("mongoose");

const MspEventImage = new mongoose.Schema(
  {
  
    msp_event_image:{type:Array}
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("MspEventImages", MspEventImage);
