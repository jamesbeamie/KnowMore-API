const passport = require("passport");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const checkAuthentication = require("../middlewares/AuthMiddleware");

const uploadImage = require("../middlewares/ImageUploader");
require("../config/passportConfig")(passport);
const { userLogin } = require("../controllers/authController/loginHandler");
const {
  sendResetLink,
  updatePwd,
} = require("../controllers/authController/pwdResetHandler");

const {
  registerUser,
  activateUser,
  fetchUsers,
  specificUser,
  updateUser,
  deleteAccount,
} = require("../controllers/authController/signUpHandler");
const {
  allDevices,
  createDevice,
  specificDevice,
  deleteDevice,
  updateDevice,
} = require("../controllers/deviceControllers/deviceHandler");
// Login route
router.post("/login", userLogin);
// pwd reset
// sending the link to the email
router.post("/reset-request", sendResetLink);
// change password
router.post("/reset/:verificationTkn", updatePwd);
// creating user
router.post("/users/signup", registerUser);

// get all users
router.get("/users", fetchUsers);

// get a specific user
router.get("/users/:userId", checkAuthentication, specificUser);

// Edit User
router.patch("/users/:userId", checkAuthentication, updateUser);

// delete user
router.delete("/users/:userId", checkAuthentication, deleteAccount);

// activate account
router.post("/users/activate/:verificationToken", activateUser);
// Get all devices
router.get("/devices/:filters", allDevices);

// add a device
router.post(
  "/devices/add",
  uploadImage.single("deviceImage"),
  checkAuthentication,
  createDevice
);

// get a specific device
router.get("/devices/specific/:deviceId", specificDevice);

//delete a device
router.delete("/devices/delete/:deviceId", checkAuthentication, deleteDevice);

// Edit device
router.patch(
  "/devices/edit/:deviceId",
  uploadImage.single("deviceImage"),
  checkAuthentication,
  updateDevice
);
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
