const express = require('express');
const Song = require('../models/Song')

const router = express.Router();

router.use((req, res, next) => {
  console.log('DEBUG routes/songsearch');
  next()
})

// route to search form for songs
// router.get('/songsearch/:id', (req, res, next) => {
//   Song.find()
//     .then(songs => {
//       res.json(songs)
//     })
//     .catch(err => next(err))
// });
router.get('/', (req, res, next) => {
  spotifyApi.searchArtists('Elvis')
  .then(data => {
    console.log('Search artists by "Love"', data.body);
  })
  .catch (err => console.log(err))
})
