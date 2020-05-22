const Device = require("../../models/devices/DevicesModel");
// const checkAuthentication = require("../../middlewares/AuthMiddleware");

// get all devices
const allDevices = async (req, res) => {
  try {
    const filter = req.params.filters;
    // return all devices
    if (filter === "default") {
      const devices = await Device.find().populate(" reviews");
      res.json(devices);
    } else {
      // return filtered devices
      const filteredDevices = await Device.find({
        $or: [
          { name: filter },
          { model: filter },
          { size: filter },
          { color: filter },
          { tags: filter },
          { productionYear: filter },
        ],
      });
      res.json(filteredDevices);
    }
  } catch (err) {
    res.json({ message: `sorry the errow :${err} occured` });
  }
};
// create a device
const createDevice = async (req, res) => {
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
};

// specific device
const specificDevice = async (req, res) => {
  const theId = req.params.deviceId;
  try {
    const device = await Device.findById(theId).populate(" reviews");
    if (device) {
      res.json(device);
    } else {
      res.status(404).json({ message: `${theId} not found` });
    }
  } catch (err) {
    res.json({ message: `sorry :${theId} was not found` });
  }
};
// delete device
const deleteDevice = async (req, res) => {
  try {
    const exists = await Device.findById(req.params.deviceId);
    if (exists) {
      const deletedDevice = await Device.remove({ _id: req.params.deviceId });
      res.json({ devices: deletedDevice, message: "deleted" });
    } else {
      res.json({ message: `sorry :${req.params.deviceId} was not found` });
    }
  } catch (err) {
    res.json({ message: `Error deleting :${req.params.deviceId}` });
  }
};
// edit device
const updateDevice = async (req, res) => {
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
};
module.exports = {
  allDevices,
  createDevice,
  specificDevice,
  deleteDevice,
  updateDevice,
};
