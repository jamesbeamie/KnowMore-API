let mongoose = require("mongoose");

// Posts Schema

let postSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  productionYear: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  deviceImage: {
    type: String,
    require: true
  },
  tags: [{ type: String, require: true }]
});

module.exports = mongoose.model("Device", postSchema);
