const express = require('express');
const { isLoggedIn } = require('../middlewares')
const router = express.Router();
const mongoose = require('mongoose')
const Song = require("../models/Song");
const User = require('../models/User')
const Playlist = require("../models/Playlist");


//  Get the users profile
router.get('/profile', isLoggedIn, (req, res, next) => {
  res.json(req.user);
});

//  Update user document 
router.post('/profile/update', isLoggedIn, (req, res, next) => {
  console.log(req.body)
  User.findByIdAndUpdate(req.body._user, {_currentlyEditing: req.body._playlist, _activePlaylists: req.body._playlist}, {new: true})
    .then(userUpdated => {
      res.json(userUpdated)
    })
    .catch(err => {
      res.json({ message: 'Error updating User'})
    })
})

// Add playlist to db
router.post("/createplaylist/create", (req, res, next) => {
  Playlist.create({
    name: req.body.name,
    _users: req.body._users,
    _host: req.body._host,
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

// Add song to db
router.post("/songsearch/add", (req, res, next) => {
    Song.create({
      artist: req.body.artist,
      name: req.body.name,
      genres: 'testing',
      year: req.body.releaseDate,
      songId: req.body.songId,
      imgUrl: req.body.imgUrl
    })
    .then(songCreated => {
      console.log('TCL: songCreated', songCreated, req.body._PLtoAddSongTo)
      Playlist.findByIdAndUpdate(req.body._PLtoAddSongTo, {_songs: songCreated._id}, {new: true})  
      .then(playlistUpdated => {
        console.log('TCL: playlistUpdated', playlistUpdated)
        return res.json(playlistUpdated)
      })
      .catch(err => {
        res.json({ message: 'Error updating playlist.'})
      })  
    })
    .catch(err => {
      res.json({ message: 'Error adding song to database.'})
    })  
})

router.post('/playlist', isLoggedIn, (req, res, next) => {
  console.log('Sending playlistId: ', req.body)
  Playlist.findById(req.body)
    .then(playlist => {
			console.log('TCL: Playlist data retrieved ', playlist)
      })
    .catch(err => console.log(err))  
})
// Get songs from db
router.post('/fetchsongs', (req, res, next) => { 
  Playlist.findById(req.body.playlistId)
  .select('_songs')
  .populate('_songs')
  .exec()
  .then(data => {
  // console.log('BRAH', data)
  res.json(data)
})
.catch(err => console.log(err))  
})


module.exports = router;
