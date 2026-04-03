const mongoose = require("mongoose");


const AcceptProfileSchema = new mongoose.Schema(
  {
    MaleProfile: { type: mongoose.Schema.Types.ObjectId, ref: "UserProfile" },
    FemaleProfile: { type: mongoose.Schema.Types.ObjectId, ref: "UserProfile" },
    MatchingPercentage:{type:Number},
    Status:{type:String,default:"Pending"},
    MatchedBy:{ type: mongoose.Schema.Types.ObjectId, ref: "msp" },
  },
  { timestamps: true } // adds createdAt & updatedAt
);

module.exports= mongoose.model("AcceptProfile", AcceptProfileSchema);
