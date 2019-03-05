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
    }
  }
  componentDidMount() {
    api.getProfile()
    .then(user => {
      this.setState({
        currentlyEditing: user._currentlyEditing
      })
    })
    setTimeout(() => {
      api.fetchSongs({
        playlistId: this.state.currentlyEditing
      })
      .then(user => {
        this.setState({
          songsMetaData: user._songs,
          currentlyEditingName: user.name,
        })
      })
    //  TODO: api-call on backend to get playlist document from the database; use currentlyEditing property in user document to get the current PL
    //  TODO: function to 
    //         1. split the songs in the PL into those containng the user's _id and the rest
    //         2. push the two sections into the appropriate arrays
  }, 500);
  }
  deleteSong () {
    console.log('deleteItem triggered')
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
        <h3 className="text-center">Currently editing: <strong>{this.state.currentlyEditingName}</strong></h3>
            <ul>
              {this.state.songsMetaData ? this.state.songsMetaData.map((song, i) => 
                <ListItemPlaylist title={song.name} artist={song.artist} img={song.imgUrl} songId={song.songId} key={i} deleteItem={() => this.deleteSong()}/>
              ) : console.log('Loading songs from database..') }
            </ul>
            TEST            
        </div>
      </div>
    )
  }
}
