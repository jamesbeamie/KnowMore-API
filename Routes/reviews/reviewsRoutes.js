const express = require("express");
const router = express.Router();

const Review = require("../../models/reviews/reviewsModels");
const Device = require("../../models/devices/DevicesModel");
const authMiddleware = require("../../middlewares/AuthMiddleware");

// create review
router.post("/:deviceId", authMiddleware, async (req, res) => {
  const deviceToReview = await Device.findById(req.params.deviceId);
  if (deviceToReview) {
    try {
      const { review } = req.body;
      const newReview = new Review({
        review,
        reviewedAt: new Date(),
      });
      await newReview.save();
      deviceToReview.reviews.push(newReview);
      await deviceToReview.save();
      res.status(201).json({ newReview, message: "reviewed" });
    } catch {
      res.status(400).json({ message: "Error adding review" });
    }
  } else {
    res.json({ message: "Device was not found" });
  }
});

//delete a review
router.delete("/:reviewId", authMiddleware, async (req, res) => {
  const reviewExists = await Review.findById(req.params.reviewId);
  if (reviewExists) {
    try {
      await Review.deleteOne({ _id: req.params.reviewId });
      res.status(200).json({ message: "Review deleted" });
    } catch {
      res.json({ message: "Could not delete review" });
    }
  } else {
    res.json({ message: "review does not exist" });
  }
});

module.exports = router;
