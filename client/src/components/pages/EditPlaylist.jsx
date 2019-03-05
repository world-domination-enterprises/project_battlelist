import React, { Component } from 'react'
import SongSearch from './SongSearch'
import ListItemPlaylist from '../ListItemPlaylist';
import UserSelectedSongs from '../UserSelectedSongs';
import SpotifyWebApi from 'spotify-web-api-node'
import api from '../../api';


export default class CreatePlayList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      accessToken: '',
      searchString: '',
      searchResults: [],
      _userCurrentlyEditing: null,
      currentlyEditingName: '', //  LIFTED
      _userSelectedSongs: [], //  LIFTED
      _songsInPlaylist: [], //  LIFTED
      songsMetaData: null,  //  LIFTED; TODO: use this of just iframes?
    }
    this.addSong = this.addSong.bind(this); //  TODO: is this necessary?
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.getSongsfromSpotify = this.getSongsfromSpotify.bind(this);
  }

  //  LIFTED
  getSongsfromSpotify() {
    const spotifyApi = new SpotifyWebApi()
  
    spotifyApi.setAccessToken(this.state.accessToken);
    spotifyApi.searchTracks(this.state.searchString, {limit: 10,})
      .then(data => {
        JSON.stringify(data, null, 2)
        console.log('TCL: SongSearch -> handleKeyUp -> data', data)
        this.setState({
        searchResults: data.body.tracks.items
        })
      })
    }

  addSong(key) {
    let song = this.state.searchResults[key]

    api.postSong({
      artist: song.artist,
      name: song.title,
      songId: song.songId,
      releaseDate: song.rlsDate,
      imgUrl: song.img,
      _PLtoAddSongTo: song._userCurrentlyEditing,
    })
    .then(playlistUpdated => {
    console.log('TCL: ListItemSongsearch -> addSong -> playlistUpdated', playlistUpdated)
  })
}

  //  LIFTED
  handleSearchChange(searchString) {
    this.setState({
      searchString: searchString
    })
  }

  //  LIFTED
  deleteSong (_songId) {
    console.log('deleteSong() triggered')
    console.log(_songId)
    api.deleteSong({
      _songId: _songId,
      _playlistId: this.state._userCurrentlyEditing,
    })
    .then(res => console.log(res))
  }

  componentDidMount() {
    //  API: Refresh spotify access token and get it to run Spotify-API calls
    api.refreshAndFetchAccessToken()
    .then(data => {
      console.log('TCL: refreshAndFetchAccessToken', data)
      this.setState({
        accessToken: data.body.access_token,
      })
    })
    
    //  API: Get user data from database
    api.getProfile()
      .then(user => {
				console.log('TCL: ListItemSongsearch -> componentDidMount -> user', user)
        this.setState({
          _userCurrentlyEditing: user._currentlyEditing
        })
        api.fetchSongs({
          _playlistId: this.state._userCurrentlyEditing
        })
        .then(playlist => {
          console.log('TCL: CreatePlayList -> componentDidMount -> playlist', playlist)
          this.setState({
            songsMetaData: playlist._songs,
            currentlyEditingName: playlist.name,
          })
        })
      })
    }
  //   setTimeout(() => {
  //     //  API: Get songdata from playlist currently being edited  
      
  //   }, 500)  


  render() {
    return (
      <div className="search-pl-container">
        <SongSearch 
          value={this.state.searchString} 
          onSearchChange={this.handleSearchChange}
          spotifySearch={this.getSongsfromSpotify}
          searchResults={this.state.searchResults}
          _userCurrentlyEditing={this.state._userCurrentlyEditing}
          triggerSongAdd={this.addSong} 
        />
        
        <div className="pl-container">
          <div className="userSongs">
              <ul>
                {this.state._userSelectedSongs.map((song, i) => 
                  <UserSelectedSongs title={song.name} artist={song.artist} img=  {song.imgUrl} songId={song.id} key={i} />
                )}
              </ul>
          </div>

          <div className="playlist">
            <h4 className="text-center m-4">Currently editing: <strong>{this.state.currentlyEditingName}</strong></h4>
                <ul>
                  {this.state.songsMetaData ? this.state.songsMetaData.map((song, i)  => 
                    <ListItemPlaylist 
                      title={song.name} 
                      artist={song.artist} 
                      img={song.imgUrl} 
                      songId={song.songId} 
                      key={i} 
                      deleteItem={() => this.deleteSong(song._id)}/>
                    ) : console.log('Loading songs from database..') }
                </ul>        
          </div>
        </div>

      </div>
    )
  }
}
