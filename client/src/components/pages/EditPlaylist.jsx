import React, { Component } from 'react'
import SongSearch from './SongSearch'
import ListItemPlaylist from '../ListItemPlaylist';
import UserSelectedSongs from '../UserSelectedSongs';
import spotifyApi from '../../spotifyApi'
import api from '../../api';
import { Container } from 'reactstrap';
import{ Redirect } from 'react-router-dom'

export default class EditPlayList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      accessToken: '',
      searchString: '',
      searchResults: [],
<<<<<<< HEAD
      currentlyEditingName: '', //  LIFTED
      _userSelectedSongs: [], //  LIFTED
      _songsInPlaylist: [], //  LIFTED
      songsMetaData: null,  //  LIFTED
      _userId: null,
      activePlaylists: []
=======
      currentlyEditingName: '', 
      _userSelectedSongs: [],
      _songsInPlaylist: [],
      songsMetaData: null,        // TODO: use this of just iframes?
>>>>>>> 2b8c5223c4377e7a839014b0a25d61de7255d740
    }
    this.addSong = this.addSong.bind(this); //  TODO: is this necessary?
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.getSongsfromSpotify = this.getSongsfromSpotify.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  getSongsfromSpotify() {
    spotifyApi.searchTracks(this.state.searchString, { limit: 10, })
    .then(items => {
      this.setState({
        searchResults: items
      })
    })
  }

  addSong(key) {
    let song = this.state.searchResults[key]
		console.log('TCL: CreatePlayList -> addSong -> song', song)

    api.postSong({
      artist: song.artists[0].name,
      name: song.name,
      songId: song.id,
      releaseDate: song.album.release_date,
      imgUrl: song.album.images[0].url,
      album: song.album.name,
      _PLtoAddSongTo: this.props.match.params.playlistId,
    })
      .then(playlistUpdated => {
        console.log('TCL: ListItemSongsearch -> addSong -> playlistUpdated', playlistUpdated)
        this.fetchPlaylistSongs()
      })
  }

  handleSearchChange(searchString) {
    this.setState({
      searchString: searchString
    })
  }

  deleteSong (songId) {
    console.log('deleteSong() triggered')
    console.log(songId)
    api.deleteSong(this.props.match.params.playlistId, songId)
    .then(res =>{ 
      console.log(res)
      // // Method 1, efficient, but could be problematic if multiple persons are working on the same playlist at the same time
      // this.setState({
      //   songsMetaData: this.state.songsMetaData.filter(songMetaData => songMetaData._id !== _songId)
      // })

      // Method 2, get the current songsMetaData
      this.fetchPlaylistSongs()
    })
  }

  componentDidMount() {
    api.getProfile()
    .then(user => {
      console.log('dattttatat:',user)
      this.setState({
        _userId: user._id,
        activePlaylists: user._activePlaylists
      })
    })
    this.fetchPlaylistSongs()
    setTimeout(() => {
      if (!this.state.activePlaylists.includes(this.props.match.params.playlistId))
      this.updateUser()
    }, 500)
  } 

  fetchPlaylistSongs() {
    api.fetchSongs(this.props.match.params.playlistId)
      .then(playlist => {
        console.log('TCL: CreatePlayList -> componentDidMount -> playlist', playlist)
        this.setState({
          songsMetaData: playlist._songs,
          currentlyEditingName: playlist.name,
        })
      })
  }
  updateUser(){
    api.updateUser(this.state._userId, this.props.match.params.playlistId)
    .then(res => console.log('tillbäaks',res))
  }
  render() {
    if (!api.isLoggedIn()) {
      api.saveLastPlaylistVisited(this.props.match.params.playlistId)
      return <Redirect to="/login"/>
    }
    return (
      <div className="search-pl-container">
        <SongSearch
          value={this.state.searchString}
          onSearchChange={this.handleSearchChange}
          onSpotifySearch={this.getSongsfromSpotify}
          searchResults={this.state.searchResults}
          onSongAdd={this.addSong}
        />

        <div className="pl-container scroll-y">
          <Container>
          <div className="userSongs">
            <ul>
              {this.state._userSelectedSongs.map((song, i) =>
                <UserSelectedSongs title={song.name} artist={song.artist} img={song.imgUrl} songId={song.id} key={i} />
              )}
            </ul>
          </div>

          <div className="playlist">
            <h3 className="text-center m-5 currently">Currently editing: <strong>{this.state.currentlyEditingName}</strong></h3>
            <ul className="ul">
              {this.state.songsMetaData ? this.state.songsMetaData.map((song, i) =>
                <ListItemPlaylist
                  title={song.name}
                  artist={song.artist}
                  img={song.imgUrl}
                  songId={song.songId}
                  album={song.album}
                  key={i}
                  onDeleteItem={() => this.deleteSong(song._id)} />
              ) : console.log('Loading songs from database..')}
            </ul>
          </div>
          </Container>
        </div>

      </div>
    )
  }
}
