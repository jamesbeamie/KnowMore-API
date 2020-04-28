const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../../../middlewares/NodeMailer");

const User = require("../../../models/users/UserModel");

// sending the link to the email
router.post("/request", async (req, res) => {
  const { email } = req.body;
  const exists = await User.find({ email });
  if (exists.length >= 1) {
    const token = jwt.sign({ email }, process.env.JWT_SECRETE_KEY, {
      expiresIn: "1hr",
    });
    await User.updateOne(
      {
        email,
      },
      { $set: { verificationTkn: token } }
    );
    await mailSender(email, token);
    res.json({
      message: `A password reset link has been send to ${email}. Check to reset password`,
    });
  } else {
    res.json({ message: "user not found" });
  }
});

// change password
router.post("/reset/:verificationTkn", async (req, res) => {
  try {
    const { password } = req.body;
    const hashedPwd = await bcrypt.hash(password, 12);
    await User.updateOne(
      {
        verificationTkn: req.params.verificationTkn,
      },
      { $set: { password: hashedPwd, verificationTkn: null } }
    );
    res.status(201).json({
      message: "Update successful",
    });
  } catch (err) {
    res.json({ message: "error updating user" });
  }
});
module.exports = router;
