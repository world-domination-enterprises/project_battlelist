const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  spotifyID: String,
  refreshToken: String,
  accessToken: String,
  email: String,
  country: String,
  profileUrl: String,
  photoUrl: String,
  activePlaylists: [{type: Schema.Types.ObjectId, ref:'Playlist'}],
  inactivePlaylists: [{type: Schema.Types.ObjectId, ref:'Playlist'}],
  currentlyEditing: {type: Schema.Types.ObjectId, ref:'Playlist'} //  TODO: fix size to only one element
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const User = mongoose.model('User', userSchema);
module.exports = User;
