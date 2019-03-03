import React, { Component } from 'react'
import ListItemPlaylist from './ListItemPlaylist';
import UserSelectedSongs from './UserSelectedSongs';
import api from '../api';

export default class PlayList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userSelectedSongs: [],
      songsInPlaylist: ['3ssX20QT5c3nA9wk78V1LQ']
    }
  }

  componentDidMount() {
      console.log('getSongInfo() called')
      api.fetchSongs({
        spotifyId: this.state.songsInPlaylist
      })
      .then(user => console.log(user))
    //  TODO: api-call on backend to get playlist document from the database; use currentlyEditing property in user document to get the current PL
    //  TODO: function to 
    //         1. split the songs in the PL into those containng the user's _id and the rest
    //         2. push the two sections into the appropriate arrays

  }

  render() {
    return (
      <div className="pl-container">
        <div className="userSongs">
            <ul>
              {this.state.userSelectedSongs.map((song, i) => 
                <UserSelectedSongs title={song.title} artist={song.artist} img={song} songId={song.id} key={i} />
              )}
            </ul>
        </div>
        <div className="playlist">
            <ul>
              {this.state.songsInPlaylist.map((song, i) => 
                <ListItemPlaylist title={song.title} artist={song.artist} img={song} songId={song.id} key={i} />
              )}
            </ul>
            TEST
        </div>
      </div>
    )
  }
}
