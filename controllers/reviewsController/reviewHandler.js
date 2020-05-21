const Review = require("../../models/reviews/reviewsModels");
const Device = require("../../models/devices/DevicesModel");

// create review
const addReview = async (req, res) => {
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
};
const editReview = async (req, res) => {
  try {
    let review = await Review.findById(req.params.reviewId);
    if (!review) {
      throw new Error("Review not found");
    }
    if (!req.body.review) {
      throw new Error("Review not sent");
    }
    const editedReview = req.body.review;
    review.review = editedReview;
    await review.save();
    res.status(200).json({ review, message: "Edited review" });
  } catch (error) {
    res.status(400).json({ message: "Error editing review" });
  }
};
const deleteReview = async (req, res) => {
  try {
    const reviewExists = await Review.findById(req.params.reviewId);
    if (reviewExists) {
      await Review.deleteOne({ _id: req.params.reviewId });
      res.status(200).json({ message: "Review deleted" });
    } else {
      res.json({ message: "review does not exist" });
    }
  } catch {
    res.json({ message: "Could not delete review" });
  }
};
module.exports = { addReview, editReview, deleteReview };
