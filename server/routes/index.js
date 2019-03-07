const express = require('express');
const { isLoggedIn } = require('../middlewares')
const router = express.Router();
const Song = require("../models/Song");
const User = require('../models/User')
const Playlist = require("../models/Playlist");
const nodemailer = require("nodemailer");

//  Get the users profile
router.get('/profile', isLoggedIn, (req, res, next) => {
  res.json(req.user);
});

//  Update user document 
router.put('/profile', isLoggedIn, (req, res, next) => {
  User.findByIdAndUpdate(req.body._user, { $set: { _currentlyEditing: req.body._playlist }, $addToSet: { _activePlaylists: req.body._playlist }}, {new: true, runValidators:true})
    .then(userUpdated => {
      res.json(userUpdated)
    })
    .catch(err => {
      res.json({ message: 'Error updating User'})
    })
})
// Add playlist to db
router.post("/playlists", (req, res, next) => {
  Playlist.create({
    name: req.body.name,
    _users: req.body._host,
    _host: req.body._host,
    maxSongs: req.body.maxSongs,
    isActive: req.body.isActive,
  })
    .then(playlistCreated => {
      console.log('TCL: playlistCreated', playlistCreated)
      res.json(playlistCreated)
  })
    .catch(err => {
      res.json({ message: "Error updating playlist."})
    });
})

// COMMENTS: the route POST "/playlists/:playlistId/songs" would have been better

// Add song to db
router.post("/songsearch/add", (req, res, next) => {
    Song.create({
      artist: req.body.artist,
      name: req.body.name,
      genres: 'testing',
      year: req.body.releaseDate,
      songId: req.body.songId,
      imgUrl: req.body.imgUrl,
      album: req.body.album
    })
    .then(songCreated => {
      console.log('TCL: songCreated', songCreated, req.body._PLtoAddSongTo)
      Playlist.findByIdAndUpdate(req.body._PLtoAddSongTo, { $addToSet: {_songs: songCreated._id}}, {new: true, runValidators:true})

      .then(playlistUpdated => {
        console.log('TCL: playlistUpdated', playlistUpdated)
        return res.json(playlistUpdated)
      })
      .catch(err => {
        console.log("adding songsearch add", err)
        res.json({ message: 'Error updating playlist.' })
      })  
    })
    .catch(err => {
      console.log("adding songsearch add", err)
      res.json({ message: 'Error adding song to database.'})
    })  
})
// Get hosted playlists
router.post('/gethostedplaylists', isLoggedIn, (req, res, next) => {
  console.log('wtf mate: ', req.body.userId)
  Playlist.find({ "_host": req.body.userId})
  .then(playlist => {
      console.log('TCL: Playlist data retrieved', playlist)
      res.json(playlist)
      })
    .catch(err => console.log(err))  
})
// Get active playlists
router.post('/getplaylists', isLoggedIn, (req, res, next) => {
  User.findById(req.body._userId)
  .populate('_activePlaylists')
  .then(playlist => {
      console.log('TCL: Playlist data retrieved ', playlist)
      res.json(playlist)
      })
    .catch(err => console.log(err))  
})

// Get songs from db
router.get('/playlists/:playlistId', (req, res, next) => {
  Playlist.findById(req.params.playlistId)
    .populate('_songs')
    .then(data => {
      res.json(data)
    })
    .catch(err => console.log(err))
})

// Delete song from playlist
router.delete('/playlists/:playlistId/songs/:songId', (req, res, next) => {
  Playlist.findByIdAndUpdate({ _id: req.params.playlistId },
    { $pull: { _songs: req.params.songId } })
    .then(data => {
      console.log('Itemdeleted', data)
      res.json(data)
    })
    .catch(err => console.log(err))
})

// Delete playlist
router.delete('/playlists/delete/:playlistId', (req, res, next) => {
  Playlist.findOneAndDelete(req.params.playlistId)
    .then(data => {
      console.log('Playlist deleted: ', data)
      res.json(data)
    })
    .catch(err => console.log(err))
})

//Nodemailer route
router.post('/send-email', (req, res, next) => {
  let { email, username, playlistId, playlistName } = req.body
  let subject = 
  'You have been invited to collaborate on a Listr. playlist!'
  let message = 
  `You got a listr invite to collaborate on the playlist <strong>${playlistName}</strong> hosted by <strong>${username}</strong>. <br><br>
  Follow this link and start adding tracks: <a href="https://listr-music.herokuapp.com/playlist/${playlistId}">https://listr-music.herokuapp.com/playlist/${playlistId}</a> <br><br>
  <i>-Listr team</i>`

  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD
    }
  });
  email.forEach((mail) => {
  transporter.sendMail({
    from: '"Listr. Team 🎵" <listrmusic@gmail.com>',
    to: mail, 
    subject: subject, 
    text: message,
    html: `<p>${message}</p>`
  })
})
  .then(info => res.render('message', {email, subject, message, info}))
  .catch(error => console.log(error));
});

module.exports = router;
