const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../../middlewares/NodeMailer");
const User = require("../../models/users/UserModel");

// send email
const sendResetLink = async (req, res) => {
  try {
    const { email } = req.body;
    const exists = await User.find({ email });
    if (exists) {
      const token = jwt.sign({ email }, process.env.JWT_SECRETE_KEY, {
        expiresIn: "1hr",
      });
      // set a token to ensure only a verified user can reset the pwd
      await User.updateOne(
        {
          email,
        },
        { $set: { verificationTkn: token } }
      );

      const linkFor = "pwdReset";
      const subject = "Device Zone password reset ✔";
      await mailSender(email, token, linkFor, subject);
      res.json({
        message: `A password reset link has been send to ${email}. Check to reset password`,
      });
    } else {
      res.json({ message: "user not found" });
    }
  } catch {
    res.json({ message: "There was a problem sending the link" });
  }
};

// update password
const updatePwd = async (req, res) => {
  try {
    const { password } = req.body;
    const hashedPwd = await bcrypt.hash(password, 12);
    // update pwd and destroy the token
    await User.updateOne(
      {
        verificationTkn: req.params.verificationTkn,
      },
      { $set: { password: hashedPwd, verificationTkn: null } }
    );
    res.status(201).json({
      message: "Your password has been successfuly changed",
    });
  } catch (err) {
    res.json({ message: "error updating user" });
  }
};
module.exports = { sendResetLink, updatePwd };
