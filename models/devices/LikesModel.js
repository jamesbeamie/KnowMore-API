let mongoose = require("mongoose");

// Like Schema
const Schema = mongoose.Schema;

let likeSchema = new Schema({
  like: {
    type: Number,
    required: true,
  },
  likedAt: {
    type: Date,
  },
  device: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Device",
  },
});

module.exports = mongoose.model("Likes", likeSchema);
