const Device = require("../../models/devices/DevicesModel");
// const checkAuthentication = require("../../middlewares/AuthMiddleware");

// like
const postLike = async (req, res) => {
  const deviceExists = await Device.findById(req.params.deviceId);
  if (deviceExists) {
    try {
      like = deviceExists.likes + 1;
      deviceExists.likes = like;
      await deviceExists.save();

      res.status(200).json({
        message: "You like this device",
        likes: like,
      });
    } catch (error) {
      res.status(400).json({
        message: "Problem liking this device",
      });
    }
  } else {
    res.json({ message: "Device not found" });
  }
};

// dislike
const dislikeDevice = async (req, res) => {
  try {
    // find device
    let device = await Device.findById(req.params.deviceId);
    if (!device) {
      throw new Error("Device not found");
    }

    // update dislikes
    updatedDislikes = device.dislikes + 1;
    device.dislikes = updatedDislikes;
    await device.save();

    res.status(200).json({
      success: true,
      message: "disliked",
      dislikes: updatedDislikes,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

// remove dislike
const removeDislike = async (req, res) => {
  try {
    // find device
    let device = await Device.findById(req.params.deviceId);
    if (!device) {
      throw new Error("Device not found");
    }

    // update dislikes
    if (device.dislikes <= 0) {
      // shouldn't decrement dislikes if dislikes are zero or below zero
      throw new Error("There are no dislikes to remove");
    }
    let updatedDislikes = device.dislikes - 1;
    device.dislikes = updatedDislikes;
    await device.save();
    res.status(200).json({
      success: true,
      message: "removed dislike",
      dislikes: updatedDislikes,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = { postLike, dislikeDevice, removeDislike };
