const passport = require("passport");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("../config/passportConfig")(passport);
const { userLogin } = require("../controllers/authController/loginHandler");

// Login route
router.post("/login", userLogin);

// sign token
const signToken = (user) =>
  jwt.sign({ id: user.id }, process.env.JWT_SECRETE_KEY, {
    expiresIn: "1hr",
  });

// login with facebook
router.get("/facebook", passport.authenticate("facebook", { scope: "email" }));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { session: false }),
  (req, res, next) => {
    const accessToken = signToken(req.user);
    res.json({
      accessToken,
    });
  }
);

// login with google
router.get("/google", passport.authenticate("google"));

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res, next) => {
    const accessToken = signToken(req.user);
    res.json({
      accessToken,
    });
  }
);
module.exports = router;
