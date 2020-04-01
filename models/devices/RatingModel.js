let mongoose = require("mongoose");

// Rating Schema
const Schema = mongoose.Schema;

let ratingSchema = new Schema({
  RateValue: {
    type: Number,
    require: true
  }
});

module.exports = mongoose.model("Rating", ratingSchema);
