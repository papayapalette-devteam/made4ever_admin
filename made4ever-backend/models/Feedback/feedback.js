const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    bureau: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "msp", // or Bureau model
      required: true,
    },
    feedback: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
