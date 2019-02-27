const express = require('express');
const Song = require('../models/Song')

const router = express.Router();

router.use((req, res, next) => {
  console.log('DEBUG routes/songsearch');
  next()
})

// route to search form for songs
router.get('/searchsongs', (req, res, next) => {
  Song.find()
    .then(songs => {
      res.json(songs)
    })
    .catch(err => next(err))
});