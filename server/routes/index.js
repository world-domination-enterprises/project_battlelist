const express = require('express');
const { isLoggedIn } = require('../middlewares')
const router = express.Router();
const Song = require("../models/Song");
const User = require('../models/User')
const Playlist = require("../models/Playlist");

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

// COMMENTS: the route POST "/playlists/:playlistId/songs" would have been better

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
// Get active playlists
router.post('/playlists', isLoggedIn, (req, res, next) => {
  User.findById(req.body._userId)
  .select('_activePlaylists')
  .populate('_activePlaylists')
  .exec()
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


module.exports = router;
