const express = require("express");

const router = express.Router();
const Post = require("../models/Posts");

router.get("/", (req, res) => {
  res.send("mUMSDLKNSL KDSN");
});

router.post("/add", async (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    author: req.body.author,
    body: req.body.body
  });

  try {
    const savePost = await newPost.save();
    res.json(savePost);
  } catch (err) {
    res.json({ message: "Error posting" });
  }
});

module.exports = router;
