const express = require("express");

const router = express.Router();

const Device = require("../../models/devices/DevicesModel");
const User = require('../../models/users/UserModel');
const authMiddleware = require("../../middlewares/AuthMiddleware");

router.get('/add/:deviceId', authMiddleware, async (req, res) => {
  try {
    let user = await User.findById(req.userData.id);
    let device = await Device.findById(req.params.deviceId);
    if (!user || !device) {
      return res.status(500).json({
        message: "no data found",
      });
    }
    // check if device is already in favorites
    const added = user.favorites.includes(device.id);
    if (added) {
      return res.json({ message: "Decice already added to favorites" });
    }
    user.favorites.push(device);
    await user.save();
    res.status(200).json({
      message: "Added favorite",
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while adding favorites",
    });
  }
});

// remove favorite
router.get("/remove/:deviceId", authMiddleware, async (req, res) => {
  try {
    let user = await User.findById(req.userData.id);
    let device = await Device.findById(req.params.deviceId);
    if (!user || !device) {
      return res.status(400).json({
        message: "no data found",
      });
    }
    user.favorites = user.favorites.filter(a => {
      a !== device.id
    });
    await user.save();
    res.status(200).json({
      message: "Removed from favorites",
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occured while removing from favorites",
    });
  }
});

// get all favorites
router.get("/get/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(500).json({
        message: "user not found"
      });
    }
    const gotFavorites = await User.findById(user.id)
      .populate({ path: "favorites", populate: { path: "reviews" } });
    res.json({
      message: "Retrieved favorites",
      favorites: gotFavorites,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occured while getting favorites",
    });
  }
});

module.exports = router;
