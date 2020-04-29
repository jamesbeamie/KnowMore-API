const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

// Posts Schema

const userSchema = mongoose.Schema({
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
    },
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
  },
});

// hash password before save
userSchema.pre("save", async function (next) {
  try {
    if (!this.password) next();
    if (!this.password.isModified) next();// only hash if password is modified
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});
module.exports = mongoose.model("User", userSchema);
