import React, { Component } from 'react'
import api from '../../api';
import { Button } from 'reactstrap';

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
        <h2 className="mb-5">Your active playlists:</h2>
         <ul className="list-unstyled">
          {this.state.activePlaylistsMetaData ? this.state.activePlaylistsMetaData.map((playlist, i) =>
            <li className="edit-playlist-item d-flex align-self-left col-6 mx-auto" key={i}>
            <h6 className="align-self-center pt-2 pr-2">{playlist.name}</h6>
            <Button className="button btn btn-success m-1 p-0 align-self-center" onClick={(e) => this.redirectToPlaylist(playlist._id)}>Edit</Button>
            {this.state.hostedPlaylists.includes(playlist._id) && <Button className="button btn btn-danger m-1 p-0 align-self-center" onClick={() => api.deletePlaylist(playlist._id, this.state._userId)}>Delete</Button>}
            </li>
          ) : <h4>Loading playlists..</h4>}
        </ul>
      </div>
    )
  }
}
