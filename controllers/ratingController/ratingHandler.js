const Rating = require("../../models/devices/RatingModel");

// rating a device
const rateDevice = async (req, res) => {
  const { RateValue } = req.body;
  const rated = new Rating({
    RateValue,
  });

  try {
    const saveRating = await rated.save();
    res.status(201).json({ saveRating, message: "rated" });
  } catch (err) {
    res.json({ message: "Error rating a device" });
  }
};

// undo rating

const undoRating = async (req, res) => {
  try {
    // const ratings = await Rating.findById(req.params.theId);
    const deleted = await Rating.remove({ _id: req.params.theId });
    res.json(deleted);
  } catch (err) {
    res.json({ message: `sorry the error :${err} occured` });
  }
};
module.exports = { rateDevice, undoRating };
