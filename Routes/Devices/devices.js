const express = require("express");

const router = express.Router();
const Device = require("../../models/devices/DevicesModel");
const checkAuthentication = require("../../middlewares/AuthMiddleware");
const uploadImage = require("../../middlewares/ImageUploader");

// Get all devices
router.get("/", async (req, res) => {
  try {
    const devices = await Device.find().populate("likes ");
    res.json(devices);
  } catch (err) {
    res.json({ message: `sorry the errow :${err} occured` });
  }
});

// add a device
router.post(
  "/add",
  uploadImage.single("deviceImage"),
  checkAuthentication,
  async (req, res) => {
    console.log(req.file);
    const { name, model, size, color, productionYear, price, tags } = req.body;
    const newDevice = new Device({
      name,
      model,
      size,
      color,
      productionYear,
      price,
      deviceImage: req.file.path,
      tags,
    });

    try {
      const savedevice = await newDevice.save();
      res.json(savedevice);
    } catch (err) {
      res.json({ message: "Error adding a device" });
    }
  }
);

// get a specific device
router.get("/:deviceId", async (req, res) => {
  const theId = req.params.deviceId;
  try {
    const device = await Device.findById(theId).populate("likes ");
    if (device) {
      res.json(device);
    } else {
      res.status(404).json({ message: `${theId} not found` });
    }
  } catch (err) {
    res.json({ message: `sorry :${theId} was not found` });
  }
});

//delete a device
router.delete("/:deviceId", checkAuthentication, async (req, res) => {
  try {
    const exists = await Device.findById(req.params.deviceId);
    console.log("^&***(&*&", exists);
    if (exists) {
      const deletedDevice = await Device.remove({ _id: req.params.deviceId });
      res.json({ devices: deletedDevice, message: "deleted" });
    } else {
      res.json({ message: `sorry :${req.params.deviceId} was not found` });
    }
  } catch (err) {
    res.json({ message: `Error deleting :${req.params.deviceId}` });
  }
});

// Edit device
router.patch(
  "/:deviceId",
  uploadImage.single("deviceImage"),
  checkAuthentication,
  async (req, res) => {
    const exists = await Device.findById(req.params.deviceId);
    if (exists) {
      try {
        const {
          name,
          model,
          size,
          color,
          productionYear,
          price,
          tags,
        } = req.body;
        console.log("matag", req.file.path);
        const editedDevice = await Device.updateOne(
          { _id: req.params.deviceId },
          {
            $set: {
              name,
              model,
              size,
              color,
              productionYear,
              price,
              deviceImage: req.file.path,
              tags,
            },
          }
        );
        res.json({ editedDevice, message: "Edited" });
      } catch (err) {
        console.log(err);
        res.json({ message: `Error Editing :${req.params.deviceId}` });
      }
    } else {
      res.json({ message: `sorry :${req.params.deviceId} was not found` });
    }
  }
);
module.exports = router;
