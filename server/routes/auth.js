const express = require("express")
const passport = require('passport')
const router = express.Router()
const User = require("../models/User")

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt")
const bcryptSalt = 10

router.get("/logout", (req, res) => {
  req.logout()
  res.json({ message: 'You are out!' })
})

router.get(
  "/spotify-login",
  passport.authenticate("spotify", {
    scope: [
      "user-follow-read", // https://developer.spotify.com/documentation/general/guides/scopes/#user-follow-read
      "user-top-read", // https://developer.spotify.com/documentation/general/guides/scopes/#user-top-read
      "user-read-birthdate", // https://developer.spotify.com/documentation/general/guides/scopes/#user-read-birthdate
      "user-read-private", // https://developer.spotify.com/documentation/general/guides/scopes/#user-read-private
      "user-read-email" // https://developer.spotify.com/documentation/general/guides/scopes/#user-read-email
    ],
    showDialog: true
  })
);

router.get(
  "/spotify-login/callback",
  passport.authenticate("spotify", {
    failureRedirect: "/",
    failureMessage: true,
    successRedirect: process.env.FRONTEND_URI + "/success-login",
    successMessage: true
  }),
  (req, res, next) => {
    res.redirect(process.env.FRONTEND_URI + '/login/callback');
  }
);

//TODO: find a way to log user out with spotify

router.get('/logout', function(req, res){
  console.log('user: ', req.user)
  // User.findByIdAndUpdate(req.user._id, { $set: { refreshToken: 'null' } }, {new: true} )
  req.session.destroy(function (err) {
  res.redirect('/'); 
  });
  });

module.exports = router