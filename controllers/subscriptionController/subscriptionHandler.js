const Device = require("../../models/devices/DevicesModel");
const User = require("../../models/users/UserModel");

// subscribe to get notifications when the device is added
const subscribeToDevice = async (req, res) => {
  try {
    const user = await User.findById(req.userData.id);
    const device = await Device.findById(req.params.deviceId);
    const alreadySubscribed = user.subscriptions.includes(device.id);
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found, how did you login!!??" });
    } else if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }
    if (alreadySubscribed) {
      return res.status(400).json({
        message: "You already subscribed to notifications on this device",
      });
    }
    user.subscriptions.push(device);
    await user.save();
    res.status(200).json({
      message: "You have subscribed to notifications on this device",
    });
  } catch (err) {
    res.status(500).json({ errorMessage: "Error subscribing" });
  }
};

const unSubscribe = async (req, res) => {
  try {
    const user = await User.findById(req.userData.id);
    const device = await Device.findById(req.params.deviceId);
    const alreadySubscribed = user.subscriptions.includes(device.id);
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found, how did you login!!??" });
    } else if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }
    if (!alreadySubscribed) {
      return res.status(400).json({
        message: "You are not subscribed",
      });
    }
    // user.subscriptions.push(device);
    user.subscriptions = user.subscriptions.filter((devices) => {
      devices !== device.id;
    });
    await user.save();
    res.status(200).json({
      message: "You have unsubscribed to notifications on this device",
    });
  } catch (err) {
    res.status(500).json({ errorMessage: "Error unsubscribing" });
  }
};

module.exports = { subscribeToDevice, unSubscribe };
