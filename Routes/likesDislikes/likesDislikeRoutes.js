const express = require("express");
const router = express.Router();
const Likes = require("../../models/devices/LikesModel");
const Device = require("../../models/devices/DevicesModel");

// like
router.post("/like/:deviceId", async (req, res) => {
  const deviceToLikeDislike = await Device.findById(req.params.deviceId);
  if (deviceToLikeDislike) {
    try {
      const { like } = req.body;
      const liked = new Likes({
        like,
        likedAt: new Date(),
      });

      await liked.save();
      deviceToLikeDislike.likes.push(liked);
      await deviceToLikeDislike.save();
      res.status(201).json({ liked, message: "Liked" });
    } catch (err) {
      res.json({ message: "Error liking" });
    }
  } else {
    res
      .status(404)
      .json({ message: `device with id ${req.params.deviceId} not found` });
  }
});

//dislike

module.exports = router;
