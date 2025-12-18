const mongoose = require("mongoose");

const add_blog = new mongoose.Schema(
  {
    title: {type: String},
    content: { type: String},
    image: { type: String},

  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("blog", add_blog);
