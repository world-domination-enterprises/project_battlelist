const express = require('express');
const { isLoggedIn } = require('../middlewares')
const router = express.Router();
const Song = require("../models/Song");


router.get('/secret', isLoggedIn, (req, res, next) => {
  res.json({
    secret: 42,
    user: req.user
  });
});


router.get('/profile', isLoggedIn, (req, res, next) => {
  res.json(req.user);
});

router.post("/test/add", (req, res, next) => {
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
      return done(null, songCreated)
  })
.catch(err => done(err));
})



module.exports = router;
