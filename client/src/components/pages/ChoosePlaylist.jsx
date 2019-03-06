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

  addPlaylist() {
    api.addPlaylist({
      name: this.state.playlistName,
      _users: this.state._playlistCreator,
      _host: this.state._playlistCreator,
      isActive: this.state.isActive,
    })
    .then(playlistAdded => {
			console.log('TCL: ChoosePlaylist -> addPlaylist -> playlistAdded', playlistAdded)
      api.updateUser(this.state._playlistCreator, playlistAdded._id)
      .then(res => {
        console.log('TCL: ChoosePlaylist -> addPlaylist -> userUpdated', res)
        this.props.history.push("/editplaylist")
        })
      .catch(err => console.log(err)) 
      })
    .catch(err => console.log(err))  
  }

  joinPlaylist() {
    api.joinPlaylist({
      playlistCode: this.state.playlistCode,
      _playlistEditor: this.state._playlistEditor,
    })
  }
  editPlaylist() {
      api.getPlaylist({
        _userId: this.state._userId
      })
      .then(res => {
        console.log('asfgdshf', res)
        this.setState({
          activePlaylistsMetaData: res._activePlaylists
        })
      })
  }
  setCurrentlyEditing (id){
    api.updateUser(this.state._userId, id)
  .then(res => {
    this.props.history.push("/playlist/"+id)
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

        {this.state.renderCreate && <CreatePlaylist />}      
        </div>
      </div>
    )
  }
}
