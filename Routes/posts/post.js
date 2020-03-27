const express = require("express");

const router = express.Router();
const Post = require("../../models/posts/Posts");

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: `sorry the errow :${err} occured` });
  }
});

// add a post
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

// get a specific post
router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (err) {
    res.json({ message: `sorry :${req.params.postId} was not found` });
  }
});

//delete a post
router.delete("/:postId", async (req, res) => {
  try {
    const exists = await Post.findById(req.params.postId);
    if (exists) {
      const deletedPost = await Post.remove({ _id: req.params.postId });
      res.json({ posts: deletedPost, message: "deleted" });
    } else {
      res.json({ message: `sorry :${req.params.postId} was not found` });
    }
  } catch (err) {
    res.json({ message: `Error deleting :${req.params.postId}` });
  }
});

// Edit Post
router.patch("/:postId", async (req, res) => {
  try {
    const exists = await Post.findById(req.params.postId);
    if (exists) {
      const editedPost = await Post.updateOne(
        { _id: req.params.postId },
        {
          $set: {
            title: req.body.title,
            author: req.body.author,
            body: req.body.body
          }
        }
      );
      res.json({ editedPost, message: "Edited" });
    } else {
      res.json({ message: `sorry :${req.params.postId} was not found` });
    }
  } catch (err) {
    res.json({ message: `Error Editing :${req.params.postId}` });
  }
});
module.exports = router;
