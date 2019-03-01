import React, { Component } from 'react'
import ListItemPlaylist from './ListItemPlaylist';

export default class PlayList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      songsInPlaylist: [],
    }
  }
  render() {
    return (
      <div className="playlist">
          <ul>
            {this.state.songsInPlaylist.map((song, i) => 
              <ListItemPlaylist title={song.title} artist={song.artist} img={song} songId={song.id} key={i} />
            )}
          </ul>
      </div>
    )
  }
}
