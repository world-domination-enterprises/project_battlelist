import React, { Component } from 'react'
import api from '../../api';
import NamePlaylist from '../NamePlaylist';
import InviteUsers from '../InviteUsers';
import MaxSongs from '../MaxSongs';
import { Button } from 'reactstrap';

export default class CreatePlaylist extends Component {
  constructor (props) {
    super(props)
    this.state = {
      _playlistCreator: null,
      _playlistEditor: null,
      playlistName: '',
      playlistId: '',
      emailInputText: '',
      inviteUserEmails: [],
      start: null,
      end: null,
      numberOfSongs: 0,
      maxSongsPerUser: '',
      isActive: false,
      _activePlaylists: [],
      _userId: '',

      /*********** RENDER SWITCHES ************/
      renderEmail: false,
      renderSongsPerUSer: false,

      /*********** ERRORS ************/
      nameInputError: '',
      emailInputError: '',
      maxSongsInputError: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleEmailDelete = this.handleEmailDelete.bind(this)
  }

  // handleSubmit(e) {
  //   e.preventDefault()
  // }

  handleSubmit (e, stateFieldName) {
    switch(e.target.id) {
      case 'name-playlist-form':
        e.preventDefault()
        break;
      case 'invite-user-email-form':
        console.log(`DEBUG: handleSubmit triggered: changing ${stateFieldName} to ${e.target.value}`)
        this.setState({
          stateFieldName: e.target.value,
        })
        console.log(`DEBUG: handleSubmit executed: changed ${stateFieldName} to ${this.state[stateFieldName]}`)
        break;
      default:
        //  do nothing
    }
  }

  handleClick(action, e, index) {
    console.log('triggered handleClick')
    switch(action) {
      case 'addEmail':
        this.state.emailInputText 
          ? this.setState(() => {
            let helperArray = this.state.inviteUserEmails
            helperArray.push(this.state.emailInputText)
            return {inviteUserEmails: helperArray}
            })
          : this.setState({
            emailInputError: 'No Email entered. Please try again.'})
          this.setState({
          emailInputText: ''
          })
        break;

      default:
        //  do nothing
    }
  }

  handleEmailDelete(index) {
    this.setState((index) => {
      let helperArray = this.state.inviteUserEmails 
      let deletedEmail = helperArray.splice(index, 1)
      console.log('deleted Email: ', deletedEmail)
      return{inviteUserEmails: helperArray}
    })
  }

  handleNameChange(userInputName) {  
    this.setState({
        playlistName: userInputName
      })
  }

  handleInputChange(stateFieldName, e) {
    this.setState({
      [stateFieldName]: e.target.value,

      //  TODO: move this to create Button; it should only be set once the playlist is created
      // isActive: !this.state.isActive || true,
    })
  }

  turnOffError(stateErrorFieldName, timeOut) {
    setTimeout(() => {
      this.setState({
        [stateErrorFieldName]: ''
      })}, timeOut)
  }

  sendInvite() {
    api.sendEmailInvite({
      email: this.state.inviteUserEmails,
      username: this.state.userName,
      playlistId: this.state.playlistId,
      playlistName: this.state.playlistName
    })
    .then(res => console.log(res))
  }

  addPlaylist() {
    /************** ERROR CHECKS **************/
    if(
      this.state.playlistName && (this.state.maxSongsPerUser > 0) 
    ) 
    //  if no error ---> execute method
    {
      api.addPlaylist({
        name: this.state.playlistName,
        _users: this.state._playlistCreator,
        _host: this.state._playlistCreator,
        maxSongsPerUser: this.state.maxSongsPerUser,
        isActive: true,
      })
      .then(playlistAdded => {
        console.log('TCL: CreatePlaylist -> addPlaylist -> playlistAdded', playlistAdded)
        this.setState({
          playlistId: playlistAdded._id
        })
        this.sendInvite()
        api.updateUser(this.state._playlistCreator, playlistAdded._id)
        .then(res => {
          console.log("I have updated the user", this.props.history)
          this.props.history.push(`/playlist/${this.state.playlistId}`)
          console.log('TCL: CreatePlaylist -> addPlaylist -> userUpdated', res)
          })
        .catch(err => console.log(err)) 
        })
      .catch(err => console.log(err))  
    } 
    //  if error ---> set error message
    else if (!this.state.playlistName && this.state.maxSongsPerUser > 0) {
      this.setState({
        nameInputError: 'Your playlist needs a name.'
      })
    }
    else if (this.state.playlistName && this.state.maxSongsPerUser < 1) {
      this.setState({
        maxSongsInputError: 'Cannot have a playlist without songs. Please chose at least one song per User.'
      })
    }
  }

  componentDidMount(){
    api.getProfile()
      .then(user => {
        console.log('TCL: CreatePlaylist -> componentDidMount -> user', user)
        this.setState({
          _playlistCreator: user._id,
          _playlistEditor: user._id,
          userName: user.username,
          _userId: user._id   //  TODO: is this needed?
        })
      })
  }

  componentDidUpdate(prevProps, prevState) {
    this.state.nameInputError && this.turnOffError('nameInputError', 1500)
    this.state.maxSongsInputError && this.turnOffError('maxSongsInputError', 1500)
  }

  componentWillUnmount() {
    clearTimeout(this.turnOffError())
  }

  /**************************/
  // TODO: figure out which functionality was implemented with the props.history and how to handle it within the new structure
  //  --->  IMPORTANT: this was formerly the parent component ChoosePlaylist; Create playlist was its child
  // <Button className="btn btn-success mx-auto btn-fixed-width" onClick={(e) => this.toggleRender("renderCreate", e)}>Create Playlist</Button>
  // {/* What do we do with the history here? Should this be moved to the state? */}
  // {this.state.renderCreate && <CreatePlaylist history={this.props.history}/>}
  /**************************/

  render() {
    return (
      <div className='create-playlist-container d-flex justify-content-center'>
        <div className="create-playlist-wrapper flex-column align-self-center col-12">
        <NamePlaylist
          value={this.state.playlistName}
          onNameSubmit={this.handleSubmit} 
          onNameChange={this.handleNameChange}
          />
        {/* if ERROR */}
        {this.state.nameInputError && <div className='error'><small >{this.state.nameInputError}</small></div>}

        <InviteUsers 
          inviteUserEmails={this.state.inviteUserEmails} 
          value={this.state.emailInputText}
          onEmailChange={this.handleInputChange}
          onAddEmailClick={this.handleClick}
          onEmailDelete={this.handleEmailDelete}
          emailInputError={this.state.emailInputError}
          />
        {/* if ERROR */}
        {this.state.emailInputError && <div className='error'><small> {this.state.emailInputError}</small></div>}

        <MaxSongs 
            value={this.state.maxSongsPerUser}
            onMaxSongsChange={this.handleInputChange} 
          />
        {/* if ERROR */}
        {this.state.maxSongsInputError && <div className='error'><small>{this.state.maxSongsInputError}</small></div>}
        
        {/* BUTTON TO SUBMIT ALL FORM DATA ADDED TO STATE */}
        <Button className="btn btn-success mx-auto mt-4" onClick={() => this.addPlaylist()}>Create Playlist</Button>
        </div>
      </div>
    )
  }
}
