const express = require('express');
const Song = require('../models/Song')

const router = express.Router();

// route to search form for songs
// router.get('/songsearch/:id', (req, res, next) => {
//   Song.find()
//     .then(songs => {
//       res.json(songs)
//     })
//     .catch(err => next(err))
// });
