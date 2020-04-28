let mongoose = require("mongoose");

// Posts Schema

let userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  verificationTkn: { type: String },
});

module.exports = mongoose.model("User", userSchema);
