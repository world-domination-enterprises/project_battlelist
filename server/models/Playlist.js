const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Playlists have to have a name.'],
    minlength: 1,
  },
  _host:
    {type: Schema.Types.ObjectId, ref: 'User'}
  ,
  _songs:
    [{type: Schema.Types.ObjectId, ref: 'Song', default:[] }]
  ,
  _users:
    [{type: Schema.Types.ObjectId, ref: 'User'}]
  ,
  description: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  playlistCode: String,
  spotifyId: String,
  }, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
  },
});

const Song = require("../models/Song");
const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;