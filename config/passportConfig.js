const facebookStrategy = require('passport-facebook').Strategy;
const googleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

const User = require('../models/users/UserModel');

const {
  FB_API_SECRET, FB_APP_ID, GOOGLE_CLIENTID, GOOGLE_CLIENTSECRET,
} = process.env;

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });
  passport.use(new facebookStrategy({
    clientID: FB_APP_ID,
    clientSecret: FB_API_SECRET,
    callbackURL: "http://localhost:5001/auth/facebook/callback",
    profileFields: ["id", "displayName", "name", "emails"],
  }, async (req, accessToken, refreshToken, profile, done) => {
    try {
      const { id, name, email } = profile._json;
      // check if user exists
      let exists = await User.findOne({ "facebook.id": id });
      if (exists) {
        return done(null, exists);
      }
      // check if email is already registered
      exists = await User.findOne({
        $or: [
          { email },
          { "google.id": email },
        ],
      });
      if (exists) {
        // add facebook data to user info
        exists.facebook = {
          id,
          username: name,
          email,
        };
        await exists.save();
        return done(null, exists);
      }
      // if user does not exist create user
      const newUser = new User({
        facebook: {
          id,
          username: name,
          email,
        },
      });
      await newUser.save();
      done(null, newUser);
    } catch (error) {
      console.log(error);
      done(error, false);
    }
  })),
  passport.use(new googleStrategy({
    clientID: GOOGLE_CLIENTID,
    clientSecret: GOOGLE_CLIENTSECRET,
    callbackURL: "http://localhost:5001/auth/google/callback",
    scope: ["profile", "email"],
  }, async (req, accessToken, refreshToken, profile, done) => {
    try {
      const { sub, name, email } = profile._json;
      // check if user exists
      let exists = await User.findOne({ "google.id": sub });
      if (exists) {
        return done(null, exists);
      }
      // check if email is already registered
      exists = await User.findOne({
        $or: [
          { email },
          { "facebook.email": email },
        ],
      });
      if (exists) {
        // add google data to user info
        exists.google = {
          id: sub,
          username: name,
          email,
        };
        await exists.save();
        return done(null, exists);
      }
      // create new user
      const newUser = new User({
        google: {
          id: sub,
          username: name,
          email,
        },
      });
      await newUser.save();
      return done(null, newUser);
    } catch (error) {
      return done(error, false);
    }
  }));
};
