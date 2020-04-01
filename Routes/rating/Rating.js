const express = require("express");

const router = express.Router();

const Rating = require("../../models/devices/RatingModel");

// rate device
router.post("/", async (req, res) => {
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
});

// get rating
router.get("/", async (req, res) => {
  try {
    const ratings = await Rating.find();
    res.json(ratings);
  } catch (err) {
    res.json({ message: `sorry the error :${err} occured` });
  }
});
router.delete("/:theId", async (req, res) => {
  try {
    // const ratings = await Rating.findById(req.params.theId);
    const deleted = await Rating.remove({ _id: req.params.theId });
    res.json(deleted);
  } catch (err) {
    res.json({ message: `sorry the error :${err} occured` });
  }
});

module.exports = router;
