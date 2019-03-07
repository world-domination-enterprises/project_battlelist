import React, { Component } from 'react'
import api from '../../api';

export default class YourPlaylists extends Component {
  constructor (props) {
    super(props)
    this.state = {
      _userId: null,
      activePlaylistsMetaData: null,
      hostedPlaylists: []
    }
  }
  componentDidMount() {
    api.getProfile()
    .then(user => {
      this.setState({
        _userId: user._id
      })
    })
    
    setTimeout(() => {
      this.getPlaylists()
      this.getHosted()
    }, 1000)
  }
  getPlaylists() {
    api.getPlaylist({
      _userId: this.state._userId
    })
    .then(res => {
      this.setState({
        activePlaylistsMetaData: res._activePlaylists
      })
    })
  }
  getHosted() {
    api.getHostedPlaylists({
      userId: this.state._userId
    })
    .then(res => {
      this.setState({
        hostedPlaylists: res.map((r) => r._id)
    })
    })
  }
  redirectToPlaylist (playlistId){
    this.props.history.push(`/playlist/${playlistId}`)
  }
  render() {
    return (
      <div className="your-playlist-container d-flex jusify-content-center flex-column col-12">
        <h1 className="mb-5">Your active playlists:</h1>
         <ul className="list-unstyled">
          {this.state.activePlaylistsMetaData ? this.state.activePlaylistsMetaData.map((playlist, i) =>
            <li className="edit-playlist-item d-flex justify-content-center" key={i}>
            <h4 className="align-self-center">{playlist.name}</h4>
            <button className="btn btn-success m-2" onClick={(e) => this.redirectToPlaylist(playlist._id)}>Edit</button>
            {this.state.hostedPlaylists.includes(playlist._id) && <button className="btn btn-danger" onClick={() => api.deletePlaylist(playlist._id)}>Delete</button>}
            </li>
          ) : <h2>Loading playlists..</h2>}
        </ul>
      </div>
    )
  }
}
