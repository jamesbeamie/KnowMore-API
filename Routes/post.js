const express = require("express");

const router = express.Router();
const postModel = require("../models/Posts");

router.get("/", (req, res) => {
  res.send("mUMSDLKNSL KDSN");
});

router.post("/add", (req, res) => {
  console.log(req.body);
});

module.exports = router;
