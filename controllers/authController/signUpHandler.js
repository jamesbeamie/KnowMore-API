const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../../middlewares/NodeMailer");
const User = require("../../models/users/UserModel");

const validEmail = (email) => {
  let regx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regx.test(email);
};

const validPwd = (pwd) => {
  var re = /^(?=.*[a-z]){3,}(?=.*[A-Z]){2,}(?=.*[0-9]){2,}(?=.*[!@#$%^&*()--__+.]){1,}.{8,}$/;
  return re.test(pwd);
};

// create User
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // check if user exists
    let exists = await User.findOne({ email });
    if (exists) {
      return res.status(422).json({ message: "email already used" });
    }
    // check if email matches any other in db
    exists = await User.findOne({
      $or: [{ "facebook.email": email }, { "google.email": email }],
    });
    if (exists) {
      // add the data to user info
      if (validPwd(password) && validEmail(email)) {
        exists = {
          username,
          email,
          password,
        };
        await exists.save();
        res
          .status(200)
          .json({ savedUser: exists, message: "User info updated" });
      } else {
        return res.status(500).json({
          message: `Email must be of the formart example@email.com and pwd  atleast1numberspeci@lcharactorandCapital`,
        });
      }
    }
    // if user does not exist, create
    if (validPwd(password) && validEmail(email)) {
      const newUser = new User({
        username,
        email,
        password,
      });
      await newUser.save();

      // generate a verification token to attach to the activation link
      const token = jwt.sign({ email }, process.env.JWT_SECRETE_KEY, {
        expiresIn: "1hr",
      });
      await User.updateOne(
        {
          email,
        },
        { $set: { verificationTkn: token } }
      );
      const linkFor = "activation";
      const subject = "Account activation";
      await mailSender(email, token, linkFor, subject);
      res.status(201).json({ savedUser: newUser, message: "Created" });
    } else {
      return res.status(500).json({
        message:
          "Email must be of the formart example@email.com and pwd  atleast1numberspeci@lcharactorandCapital",
      });
    }
  } catch (err) {
    res.status(400);
    res.json({ message: "Error posting" });
  }
};

//activate user
const activateUser = async (req, res) => {
  try {
    // get the token from the link in the email
    const token = req.params.verificationToken;
    if (!token) {
      res.json({ message: "You are not verified" });
    }
    const verifiedUser = await User.findOne({
      verificationTkn: token,
    });

    if (verifiedUser) {
      // update user status to active
      verifiedUser.active = true;

      // destroy the verification token after activating a user
      await User.updateOne(
        {
          verificationTkn: token,
        },
        { $set: { verificationTkn: null } }
      );
      await verifiedUser.save();

      res.status(200).json({
        message: "You have activated your account",
        verifiedUser,
      });
    } else {
      res.json({
        message: "You cannot activate your account before you are verified",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Problem activating",
    });
  }
};

//get all users
const fetchUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ message: `sorry, could not find user` });
  }
};

// get specific user
const specificUser = async (req, res) => {
  try {
    const exists = await User.findById(req.params.userId);
    if (exists) {
      res.json(exists);
    } else {
      res.json({ message: `sorry user was not found` });
    }
  } catch (err) {
    res.json({ message: `sorry, user:${req.params.userId} was not found` });
  }
};

// uodate User
const updateUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const exists = await User.findById(req.params.userId);
    if (exists) {
      User.updateOne(
        { _id: req.params.userId },
        {
          $set: {
            username,
            email,
            password,
          },
        }
      );
      res.status(200).json({ message: "Edited" });
    } else {
      res.json({ message: `sorry, user :${req.params.userId} was not found` });
    }
  } catch (err) {
    res.json({ message: `Error Editing :${req.params.userId}` });
  }
};

// delete User acount
const deleteAccount = async (req, res) => {
  try {
    const exists = await User.findById(req.params.userId);
    if (exists) {
      await User.remove({ _id: req.params.userId });
      res.status(200).json({ message: "deleted" });
    } else {
      res.json({ message: `sorry :${req.params.userId} was not found` });
    }
  } catch (err) {
    res.json({ message: `Error deleting :${req.params.userId}` });
  }
};
module.exports = {
  registerUser,
  activateUser,
  fetchUsers,
  specificUser,
  updateUser,
  deleteAccount,
};
