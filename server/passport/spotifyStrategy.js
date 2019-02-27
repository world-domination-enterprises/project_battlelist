const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;
const SpotifyWebApi = require("spotify-web-api-node");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_CALLBACK_URI
});

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      callbackURL: process.env.SPOTIFY_CALLBACK_URL
      // callbackURL: "/auth/spotify/callback"
    },
    // The following function is triggered just after the user logged in from Spotify and accepted the conditions
    (accessToken, refreshToken, expiresIn, profile, done) => {
      console.log("DEBUG SpotifyStrategy called");
      console.log("TCL: profile", profile);
      console.log("TCL: expiresIn", expiresIn);
      User.findOne({ spotifyID: profile.id })
        .then(user => {
          // If we have found a user in the database
          if (user) {
            return done(null, user); // We log in the user found in the database
          } else {
            User.create({
              username: profile.displayName,
              spotifyID: profile.id,
              refreshToken,
              email: profile.emails[0].value,
              country: profile.country,
              profileUrl: profile.profileUrl,
              photoUrl: profile.photos[0]
            })
              .then(userCreated => {
                console.log('TCL: userCreated', userCreated)
                return done(null, userCreated)
                  .catch(err => done(err))
              })
              .catch(err => done(err))
            }
        })
        .catch(err => done(err));
    }
  )
);
