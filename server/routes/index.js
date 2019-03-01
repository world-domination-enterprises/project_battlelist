const express = require('express');
const { isLoggedIn } = require('../middlewares')
const router = express.Router();
const Song = require("../models/Song");
const Playlist = require('../models/Playlist');


router.get('/secret', isLoggedIn, (req, res, next) => {
  res.json({
    secret: 42,
    user: req.user
  });
});


router.get('/profile', isLoggedIn, (req, res, next) => {
  res.json(req.user);
});

router.post("/songsearch/add", (req, res, next) => {
  console.log('Backend called')
  Song.create({
    artist: req.body.artist,
    name: req.body.name,
    genres: 'testing',
    year: req.body.releaseDate,
    songId: req.body.songId,
    imgUrl: req.body.imgUrl
  })
    .then(songCreated => {
      console.log('TCL: songCreated', songCreated)
      })
    .catch(err => console.log(err));
})

router.post('/playlist', isLoggedIn, (req, res, next) => {
  console.log('Sending playlistId: ', req.body)
  Playlist.findById(req.body)
    .then(playlist => {
			console.log('TCL: Playlist data retrieved ', playlist)
      })
    .catch(err => console.log(err))  
})



module.exports = router;
