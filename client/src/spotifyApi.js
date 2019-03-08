import api from './api'
import SpotifyWebApi from 'spotify-web-api-node'

const spotifyWebApi = new SpotifyWebApi()

const errHandler = err => {
  console.error(err)
  if (err.response && err.response.data) {
    console.error("API response", err.response.data)
    throw err.response.data.message
  }
  throw err
}

export default {
  spotifyWebApi: spotifyWebApi,

  accessToken: null,

  // COMMENTS: We can potentially remove the setAccessToken
  searchTracks(searchString, options) {
    if (!this.accessToken) {
      return api.refreshAndFetchAccessToken()
        .then(data => {
          this.accessToken = data.body.access_token
          spotifyWebApi.setAccessToken(this.accessToken);
          return spotifyWebApi.searchTracks(searchString, options)
        })
        .then(data => {
          return data.body.tracks.items
        })
    }
    else {
      spotifyWebApi.setAccessToken(this.accessToken);
      return spotifyWebApi.searchTracks(searchString, options)
        .then(data => {
          return data.body.tracks.items
        })
    }
  },

  createPlaylists(userId, playlistName, options) {
    if (!this.accessToken) {
      return api.refreshAndFetchAccessToken()
        .then(data => {
          this.accessToken = data.body.access_token
          spotifyWebApi.setAccessToken(this.accessToken);
          return spotifyWebApi.createPlaylist(userId, playlistName, options)
        })
        .then(data => {
        console.log('DEBUG --- playlist created on spotify: ', data)
        return data
      })
      .catch(err => console.log('ERROR creating playlist on spotify: ', err))
    }
  }
}  
