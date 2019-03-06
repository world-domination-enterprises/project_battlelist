import React, { Component } from 'react'
import ListItemPlaylist from './ListItemPlaylist';
import UserSelectedSongs from './UserSelectedSongs';
import api from '../api';

export default class PlayList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      _userSelectedSongs: [], //  TODO: LIFTED del
      _songsInPlaylist: [], //  TODO: LIFTED del
      songsMetaData: null, //  TODO: LIFTED del
      currentlyEditing: '', //  TODO: del; not necessary lifting, alread there
      currentlyEditingName: '', //  TODO: LIFTED del
    }
  }

  //  LIFTED --- TODO: del
  componentDidMount() {
    api.getProfile()
    .then(user => {
      this.setState({
        currentlyEditing: user._currentlyEditing
      })
    this.refreshPlaylist()  
    })
  }
  //  LIFTED --- TODO: del

  //  LIFTED --- TODO: del
  refreshPlaylist () {
      api.fetchSongs(this.state.currentlyEditing)
      .then(playlist => {
        this.setState({
          songsMetaData: playlist._songs,
          currentlyEditingName: playlist.name,
        })
      })
  }
  //  LIFTED --- TODO: del

// TODO: LIFT
// TODO:  Has to trigger change in state to make component rerender
  deleteSong (songId, playlistId) {
    console.log('deleteSong() triggered')
    console.log(songId, playlistId)
    api.deleteSong({
      _songId: songId,
      _playlistId: playlistId,
    })
    .then(res => console.log(res))
  }
  // TODO: LIFT

  //  LIFTED ----- TODO: del
  render() {
    return (
      <div className="pl-container">
        <div className="userSongs">
            <ul>
              {this.state._userSelectedSongs.map((song, i) => 
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
//  LIFTED ----- TODO: del
