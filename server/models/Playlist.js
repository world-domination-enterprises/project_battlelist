const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Playlists have to have a name.'],
    minlength: 1,
  },
  _songs: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Song',
    default: [],
  },
  _users: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    default: [],
  },
  description: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: false,
  }}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
  },
  spotifyId: String,
},  
);

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;