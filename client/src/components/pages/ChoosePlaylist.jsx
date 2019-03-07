import React, { Component } from 'react'
import api from '../../api';
import CreatePlaylist from '../CreatePlaylist';

export default class ChoosePlaylist extends Component {
  constructor (props) {
    super(props)
    this.state = {
      playlistName: '',
      playlistCode: '',
      _playlistCreator: null,
      _playlistEditor: null,
      inviteUserEmails: [],
      start: null,
      end: null,
      numberOfSongs: 0,
      isActive: false,
      renderCreate: false,
      renderJoin: false,
      renderEdit: false,
      _activePlaylists: [],
      _userId: '',
    }
  }

  handleSubmit(e) {
    e.preventDefault()
  }

  toggleRender(stateFieldName, e) {
    this.setState({
      [stateFieldName]: !this.state[stateFieldName]
    })
    console.log('DEBUG: toggleRender fired: ', this.state[stateFieldName])
  }

  handleInputChange(stateFieldName, event) {
    this.setState({
      [stateFieldName]: event.target.value,
      isActive: !this.state.isActive || true,
    })
  }
  componentDidMount(){
    api.getProfile()
      .then(user => {
        console.log('TCL: ChoosePlaylist -> componentDidMount -> user', user)
        this.setState({
          _playlistCreator: user._id,
          _playlistEditor: user._id,
          _activePlaylists: user._activePlaylists,
          _userId: user._id
        })
      })
  }
  render() {
    return (
      <div className="container row col-12 choose-playlist-container m-0 p-0">
        <div className="col-12 main-page-container d-flex flex-column align-self-center mx-auto">
        <p className="sub-p text-center">Join the party or create your own</p>
        <button className="btn btn-success mx-auto btn-fixed-width" onClick={(e) => this.toggleRender("renderCreate", e)}>Create Playlist</button>

        {this.state.renderCreate && <CreatePlaylist history={this.props.history}/>}      
        </div>
      </div>
    )
  }
}
