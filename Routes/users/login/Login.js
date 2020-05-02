const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv/config");
const passport = require('passport')
require('../../../config/passportConfig')(passport)
const User = require("../../../models/users/UserModel");

// sign token
const signToken = (user) => jwt.sign(
  { id: user.id },
  process.env.JWT_SECRETE_KEY,
  {
    expiresIn: "1hr"
  },
);

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const registered = await User.findOne({ email });
  try {
    if (registered) {
      if (registered.active === "false") return res.status(401).json('Please activate your account to login');
      bcrypt.compare(password, registered.password, (err, result) => {
        if (err) {
          return res.status(401).json({ message: "Login Failed" });
        }
        if (result) {
          const token = jwt.sign(
            { id: registered._id, email },
            process.env.JWT_SECRETE_KEY,
            {
              expiresIn: "1hr"
            }
          );
          return res
            .status(200)
            .json({ email, token, message: "Login successful" });
        }
        return res.status(401).json({ message: "Incorect Pwd" });
      });
    } else {
      return res.status(401).json({ message: "Unregistered" });
    }
  } catch (err) {
    return res.status(401).json({ message: "Problem login in" });
  }
});

// login with facebook
router.get("/facebook",
  passport.authenticate('facebook', { scope: "email" }));

router.get("/facebook/callback",
  passport.authenticate("facebook", { session: false }),
  (req, res, next) => {
    const accessToken = signToken(req.user);
    res.json({
      accessToken,
    });
  });

// login with google
router.get("/google",
  passport.authenticate("google"));

router.get("/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res, next) => {
    const accessToken = signToken(req.user);
    res.json({
      accessToken,
    });
  });
module.exports = router;
