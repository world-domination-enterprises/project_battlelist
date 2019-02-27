const express = require("express")
const passport = require('passport')
const router = express.Router()
const User = require("../models/User")

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt")
const bcryptSalt = 10

router.post("/signup", (req, res, next) => {
  const { username, password, name } = req.body
  if (!username || !password) {
    res.status(400).json({ message: "Indicate username and password" })
    return
  }
  User.findOne({ username })
    .then(userDoc => {
      if (userDoc !== null) {
        res.status(409).json({ message: "The username already exists" })
        return
      }
      const salt = bcrypt.genSaltSync(bcryptSalt)
      const hashPass = bcrypt.hashSync(password, salt)
      const newUser = new User({ username, password: hashPass, name })
      return newUser.save()
    })
    .then(userSaved => {
      // LOG IN THIS USER
      // "req.logIn()" is a Passport method that calls "serializeUser()"
      // (that saves the USER ID in the session)
      req.logIn(userSaved, () => {
        // hide "encryptedPassword" before sending the JSON (it's a security risk)
        userSaved.password = undefined;
        res.json( userSaved );
      });
    })
    .catch(err => next(err))
})

router.post("/login", (req, res, next) => {
  const { username, password } = req.body

  // first check to see if there's a document with that username
  User.findOne({ username })
    .then(userDoc => {
      // "userDoc" will be empty if the username is wrong (no document in database)
      if (!userDoc) {
        // create an error object to send to our error handler with "next()"
        next(new Error("Incorrect username "))
        return
      }

      // second check the password
      // "compareSync()" will return false if the "password" is wrong
      if (!bcrypt.compareSync(password, userDoc.password)) {
        // create an error object to send to our error handler with "next()"
        next(new Error("Password is wrong"))
        return
      }

      // LOG IN THIS USER
      // "req.logIn()" is a Passport method that calls "serializeUser()"
      // (that saves the USER ID in the session)
      req.logIn(userDoc, () => {
        // hide "encryptedPassword" before sending the JSON (it's a security risk)
        userDoc.password = undefined
        res.json(userDoc)
      })
    })
    .catch(err => next(err))
})

router.post('/login-with-passport-local-strategy', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) {
      res.status(500).json({ message: 'Something went wrong' })
      return
    }

    if (!theUser) {
      res.status(401).json(failureDetails)
      return
    }

    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({ message: 'Something went wrong' })
        return
      }

      // We are now logged in (notice req.user)
      res.json(req.user)
    })
  })(req, res, next)
})

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
  "/spotify/callback",
  passport.authenticate("spotify", {
    failureRedirect: "/",
    failureMessage: true,
    successRedirect: "/profile",
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