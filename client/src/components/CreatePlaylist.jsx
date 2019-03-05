import React, { Component } from 'react'
import api from '../api'
import { Form, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon } from 'reactstrap'
import InviteUserEmails from './InviteUserEmails'


export default class createplaylist extends Component {
  constructor (props) {
    super(props)
    this.state = {
      playlistName: '',
      playlistCode: '',
      _playlistCreator: null,
      _playlistEditor: null,
      emailInputText: '',
      emailInputError: null,
      inviteUserEmails: [],
      start: null,
      end: null,
      numberOfSongs: 0,
      // isActive: false
    }
  }

  handleSubmit(stateFieldName, e) {
    switch(e.target.id) {
      case 'create-playlist-form':
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

  handleClick(stateFieldName, e) {
    console.log('triggered handleClick')
    switch(stateFieldName) {
      case 'inviteUserEmails':
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

  addPlaylist() {
    api.addPlaylist({
      name: this.state.playlistName,
      _users: this.state._playlistCreator,
      _host: this.state._playlistCreator,
      isActive: true,
    })
    .then(playlistAdded => {
			console.log('TCL: ChoosePlaylist -> addPlaylist -> playlistAdded', playlistAdded)
      this.props.history.push("/editplaylist")
      api.updateUser(this.state._playlistCreator, playlistAdded._id)
      .then(res => {
        console.log('TCL: ChoosePlaylist -> addPlaylist -> userUpdated', res)
        })
      .catch(err => console.log(err)) 
      })
    .catch(err => console.log(err))  
  }

  joinPlaylist() {
    api.joinPlaylist({
      playlistCode: this.state.playlistCode,
      _playlistEditor: this.state._playlistEditor
    })
  }

  componentDidMount() {
    api.getProfile()
      .then(user => {
        console.log('TCL: ChoosePlaylist -> componentDidMount -> user', user)
        this.setState({
          _playlistCreator: user._id,
          _playlistEditor: user._id,
        })
      })
  }

  componentDidUpdate(prevProps, prevState) {
    this.state.emailInputError && this.turnOffError('emailInputError', 2000)
  }

  componentWillUnmount() {
    clearTimeout(this.turnOffError())
  }

  render() {
    return(
      <div className='create-playlist-container'>
        <Form id='create-playlist-form' onSubmit={(e) => this.handleSubmit('playlistName', e)}>

          <FormGroup>
            <Label for="name-entry" className="mt-2">Name your playlist:</Label>
            <Input type="text" name="name-entry" id="name-entry" placeholder="New playlist" className="col-4 mx-auto" onChange={(e) => this.handleInputChange("playlistName", e)}/>
          </FormGroup>

          <FormGroup>
          <Label for="name-entry" className="mt-2">Invite your friends:</Label> <br/>
          <small>You and {this.state['inviteUserEmails'].length} friend{this.state['inviteUserEmails'].length !== 1 && 's'} will edit the playlist.</small>
            <InputGroup className='email-input'>
              <Input type="email" name="invite-user-email" id="invite-user-email-input" placeholder="Enter user's email" value={this.state.emailInputText} onChange={(e) => this.handleInputChange('emailInputText', e)}/>
              <InputGroupAddon addonType="append">
               {/* Button should only send text input to  */}
               <Button className="btn btn-primary submit-email" form='invite-user-email-input' type='button' onClick={(e) => this.handleClick('inviteUserEmails', e)}>+</Button>
              </InputGroupAddon>
            </InputGroup>
            {this.state.emailInputError && <small className='error'>{this.state.emailInputError}</small>}
        </FormGroup>

        {this.state.inviteUserEmails && <InviteUserEmails emails={this.state.inviteUserEmails} />}

        {/* BUTTON TO SUBMIT THE WHOLE FORM */}
        <Button className="btn btn-primary mx-auto" onClick={() => this.addPlaylist()}>Create</Button>
        </Form>
      </div>
    )
  }
}