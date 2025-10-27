const mongoose = require("mongoose");

const MspVideo = new mongoose.Schema(
  {
  
    msp_video:{type:Array}
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("MspVideo", MspVideo);
