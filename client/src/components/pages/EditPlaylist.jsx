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
      currentlyEditingName: '', 
      _userSelectedSongs: [],
      _songsInPlaylist: [],
      songsMetaData: null,        // TODO: use this of just iframes?
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


    // const spotifyApi = new SpotifyWebApi()

    // spotifyApi.setAccessToken(this.state.accessToken);
    // spotifyApi.searchTracks(this.state.searchString, { limit: 10, })
    //   .then(data => {
    //     JSON.stringify(data, null, 2)
    //     console.log('TCL: SongSearch -> handleKeyUp -> data', data)
    //     this.setState({
    //       searchResults: data.body.tracks.items
    //     })
    //   })
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
    //  API: Refresh spotify access token and get it to run Spotify-API calls
    // api.refreshAndFetchAccessToken()
    //   .then(data => {
    //     console.log('TCL: refreshAndFetchAccessToken', data)
    //     this.setState({
    //       accessToken: data.body.access_token,
    //     })
    //   })
    this.fetchPlaylistSongs()

    //  API: Get user data from database
    // api.getProfile()
    //   .then(user => {
    // 		console.log('TCL: ListItemSongsearch -> componentDidMount -> user', user)
    //     this.setState({
    //       _userCurrentlyEditing: user._currentlyEditing
    //     })
    //     api.fetchSongs({
    //       _playlistId: this.state._userCurrentlyEditing
    //     })
    //     .then(playlist => {
    //       console.log('TCL: CreatePlayList -> componentDidMount -> playlist', playlist)
    //       this.setState({
    //         songsMetaData: playlist._songs,
    //         currentlyEditingName: playlist.name,
    //       })
    //     })
    //   })
    
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
