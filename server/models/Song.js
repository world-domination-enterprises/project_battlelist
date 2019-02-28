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
    type: Number,
    required: true,
  },
  songId: String,
  imgUrl: String
})

const Song = mongoose.model('Song', SongSchema);

module.exports = Song;