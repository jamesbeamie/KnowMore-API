let mongoose = require("mongoose");

// Posts Schema

let userSchema = mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  facebook: {
    id: {
      type: String,
    },
    username: {
      type: String,
    },
    email: {
      type: String,
    }
  },
  google: {
    id: {
      type: String,
    },
    username: {
      type: String,
    },
    email: {
      type: String,
    },
  }
});

module.exports = mongoose.model("User", userSchema);
