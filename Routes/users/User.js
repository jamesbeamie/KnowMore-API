const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../../models/users/User");

// creating user
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const exists = await User.find({ email });
    if (exists.length >= 1) {
      return res.status(422).json({ message: "email already used" });
    } else {
      hashedPwd = await bcrypt.hash(password, 12, (err, hash) => {
        if (err) {
          return res.status(500).json({
            message: `the error :${err}`
          });
        } else {
          const newUser = new User({
            username,
            email,
            password: hash
          });

          newUser.save();
          res.status(201).json({ savedUser: newUser, message: "Created" });
        }
      });
    }
  } catch (err) {
    res.status(400);
    res.json({ message: "Error posting" });
  }
});

// get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ message: `sorry, could not find user` });
  }
});

// get a specific user
router.get("/:userId", async (req, res) => {
  try {
    const exists = await User.findById(req.params.userId);
    if (exists) {
      const user = await User.findById(req.params.userId);
      res.json(user);
    } else {
      res.json({ message: `sorry user was not found` });
    }
  } catch (err) {
    res.json({ message: `sorry, user:${req.params.userId} was not found` });
  }
});

// Edit User profile
router.patch("/:userId", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const exists = await User.findById(req.params.userId);
    if (exists) {
      hashedPwd = await bcrypt.hash(password, 12, (err, hash) => {
        if (err) {
          return res.status(500).json({
            message: `the error :${err}`
          });
        } else {
          User.updateOne(
            { _id: req.params.userId },
            {
              $set: {
                username,
                email,
                password: hash
              }
            }
          );
          res.status(200).json({ message: "Edited" });
        }
      });
    } else {
      res.json({ message: `sorry, user :${req.params.userId} was not found` });
    }
  } catch (err) {
    res.json({ message: `Error Editing :${req.params.userId}` });
  }
});

// delete user
router.delete("/:userId", async (req, res) => {
  try {
    const exists = await User.findById(req.params.userId);
    if (exists) {
      await User.remove({ _id: req.params.userId });
      res.status(200).json({ message: "deleted" });
    } else {
      res.json({ message: `sorry :${req.params.userId} was not found` });
    }
  } catch (err) {
    res.json({ message: `Error deleting :${req.params.userId}` });
  }
});
module.exports = router;
