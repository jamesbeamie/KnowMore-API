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
const {
  postLike,
  dislikeDevice,
  removeDislike,
} = require("../controllers/likesController/likesHandler");
const {
  addFavorite,
  unFavorite,
  myFavorites,
} = require("../controllers/favoritesController/favoritesHandler");
const {
  sendEmailInvite,
} = require("../controllers/authController/inviteHandler");
const {
  rateDevice,
  undoRating,
} = require("../controllers/ratingController/ratingHandler");
const {
  addReview,
  editReview,
  deleteReview,
} = require("../controllers/reviewsController/reviewHandler");
// Login route
router.post("/login", userLogin);
// pwd reset
// sending the link to the email
router.post("/reset-request", sendResetLink);
// change password
router.post("/reset/:verificationTkn", updatePwd);
// creating user
router.post("/users/signup", registerUser);
//invite users
router.post("/users/invite", checkAuthentication, sendEmailInvite);
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
// rate device
router.post("/rate", rateDevice);
router.delete("/:theId", undoRating);

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

// likes
router.post("/like/:deviceId", checkAuthentication, postLike);
// dislike
router.post("/dislike/:deviceId", checkAuthentication, dislikeDevice);
// remove dislike - when a user "unclicks" the dislike button
router.post("/remove-dislike/:deviceId", checkAuthentication, removeDislike);
router.get("/favorite/:deviceId", checkAuthentication, addFavorite);
// remove favorite
router.get("/remove-favorite/:deviceId", checkAuthentication, unFavorite);
// get all favorites for a given user
router.get("/my-favorites/:userId", myFavorites);
// reviews
// create review
router.post("/review/:deviceId", checkAuthentication, addReview);
// edit review
router.patch("/update-review/:reviewId", editReview);
//delete a review
router.delete("/delete-review/:reviewId", checkAuthentication, deleteReview);
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
