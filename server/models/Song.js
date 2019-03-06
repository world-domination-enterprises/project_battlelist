const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
  artist: String,
  name: {
    type: String,
    required: true,
    minlength: 1,
  },
  genres: {
    type: [String],
    required: true,
    default: [],
  },
  year: {
    type: String,
    required: true,
  },
  songId: String, // TODO: rename it to spotifyId
  imgUrl: String
})

const Song = mongoose.model('Song', SongSchema);

module.exports = Song;