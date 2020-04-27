let mongoose = require("mongoose");

// Like Schema
const Schema = mongoose.Schema;

let reviewSchema = new Schema({
  review: {
    type: String,
    required: true,
  },
  reviewedAt: {
    type: Date,
  },
  device: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Device",
  },
});

module.exports = mongoose.model("Review", reviewSchema);
