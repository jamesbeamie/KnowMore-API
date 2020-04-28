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

// edit review
router.patch('/:reviewId', async(req, res) => {
  let review = await Review.findById(req.params.reviewId)
  if(review) {
    try {
      const editedReview = req.body.review
      review.review = editedReview
      await review.save()
    } catch (error) {
      res.status(400).json({ message: "Error editing review"})
    }
  } else {
    res.status(404).json({ message: "Review not found"})
  } 
})
module.exports = router;
