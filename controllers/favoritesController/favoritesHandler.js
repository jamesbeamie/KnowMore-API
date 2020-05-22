const Device = require("../../models/devices/DevicesModel");
const User = require("../../models/users/UserModel");

// favorite a device

const addFavorite = async (req, res) => {
  try {
    let user = await User.findById(req.userData.id);
    let device = await Device.findById(req.params.deviceId);
    if (!user || !device) {
      return res.status(404).json({
        message: "no data found",
      });
    }
    // check if device is already in favorites
    const added = user.favorites.includes(device.id);
    if (added) {
      return res.json({ message: "Device already added to favorites" });
    }
    user.favorites.push(device);
    await user.save();
    res.status(200).json({
      message: "Added to favorite",
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while adding favorites",
    });
  }
};

// remove from Favorites
const unFavorite = async (req, res) => {
  try {
    let user = await User.findById(req.userData.id);
    let device = await Device.findById(req.params.deviceId);
    if (!user || !device) {
      return res.status(400).json({
        message: "no data found",
      });
    }
    user.favorites = user.favorites.filter((a) => {
      a !== device.id;
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
};

// get all favourites for a specific user
const myFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(500).json({
        message: "user not found",
      });
    }
    const gotFavorites = await User.findById(user.id).populate({
      path: "favorites",
      populate: { path: "reviews" },
    });
    res.json({
      message: "Retrieved favorites",
      favorites: gotFavorites,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occured while getting favorites",
    });
  }
};
module.exports = { addFavorite, unFavorite, myFavorites };
