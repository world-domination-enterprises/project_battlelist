const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
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
})

const Song = mongoose.model('Song', countrySchema);
module.exports = Song;