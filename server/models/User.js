const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Playlist = require('./Playlist')

const userSchema = new Schema({
  username: String,
  spotifyID: String,
  refreshToken: String,
  accessToken: String,
  email: String,
  country: String,
  profileUrl: String,
  photoUrl: String,
  _activePlaylists: [{type: Schema.Types.ObjectId, ref:'Playlist'}],
  _inactivePlaylists: [{type: Schema.Types.ObjectId, ref:'Playlist'}],
  _currentlyEditing: {type: Schema.Types.ObjectId, ref:'Playlist'} // TODO: remove
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const User = mongoose.model('User', userSchema);
module.exports = User;
