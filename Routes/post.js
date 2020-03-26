const express = require("express");

const router = express.Router();
const Post = require("../models/Posts");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: `sorry the errow :${err} occured` });
  }
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

router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (err) {
    res.json({ message: `sorry :${req.params.postId} was not found` });
  }
});

module.exports = router;
