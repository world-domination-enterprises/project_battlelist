import React, { Component } from 'react'
import ListItemPlaylist from './ListItemPlaylist';
import UserSelectedSongs from './UserSelectedSongs';
import api from '../api';

export default class PlayList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userSelectedSongs: [],
      songsInPlaylist: [],
      songsMetaData: null,
      currentlyEditing: '',
      currentlyEditingName: '',
      refreshComponent: this.props.refreshPlaylist
    }
  }
  componentDidMount() {
    api.getProfile()
    .then(user => {
      this.setState({
        currentlyEditing: user._currentlyEditing
      })
    this.refreshPlaylist()  
    })
  }
  refreshPlaylist () {
      api.fetchSongs({
        playlistId: this.state.currentlyEditing
      })
      .then(user => {
        this.setState({
          songsMetaData: user._songs,
          currentlyEditingName: user.name,
        })
      })
  }
  deleteSong (songId, playlistId) {
    console.log('deleteSong() triggered')
    console.log(songId, playlistId)
    api.deleteSong({
      songId: songId,
      playlistId: playlistId,
    })
    .then(res => console.log(res))
    this.refreshPlaylist()
  }
  render() {
    return (
      <div className="pl-container">
        <div className="userSongs">
            <ul>
              {this.state.userSelectedSongs.map((song, i) => 
                <UserSelectedSongs title={song.name} artist={song.artist} img={song.imgUrl} songId={song.id} key={i} />
              )}
            </ul>
        </div>
        <div className="playlist">
        <h4 className="text-center m-4">Currently editing: <strong>{this.state.currentlyEditingName}</strong></h4>
            <ul>
              {this.state.songsMetaData ? this.state.songsMetaData.map((song, i) => 
                <ListItemPlaylist title={song.name} artist={song.artist} img={song.imgUrl} songId={song.songId} key={i} deleteItem={() => this.deleteSong(song._id, this.state.currentlyEditing)}/>
              ) : console.log('Loading songs from database..') }
            </ul>        
        </div>
      </div>
    )
  }
}
