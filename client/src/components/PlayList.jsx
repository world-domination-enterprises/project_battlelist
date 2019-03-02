import React, { Component } from 'react'
import ListItemPlaylist from './ListItemPlaylist';
import UserSelectedSongs from './UserSelectedSongs';

export default class PlayList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userSelectedSongs: [],
      songsInPlaylist: [], 
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="pl-container">
        <div className="userSongs">
            <ul>
              {this.state.songsInPlaylist.map((song, i) => 
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
