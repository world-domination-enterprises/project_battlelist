import React, { Component } from 'react'
import api from '../../api';
import { Form, FormGroup, Label, Input } from 'reactstrap';

export default class ChoosePlaylist extends Component {
  constructor (props) {
    super(props)
    this.state = {
      playlistName: '',
      _playlistCreator: null,
      start: null,
      end: null,
      numberOfSongs: 0,
      isActive: false,
    }
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
    .then(user => {
      console.log(user)
      this.props.history.push("/createplaylist")
    })
  }
  componentDidMount(){
    api.getProfile()
      .then(user => {
        console.log('TCL: ChoosePlaylist -> componentDidMount -> user', user)
        this.setState({
          _playlistCreator: user._id
        })
      })
  }
  render() {
    return (
      <div className="container row w-100 mx-auto">
        <div className="col-12 main-page-container d-flex flex-column align-self-center mx-auto">
        <h1 className="main-h1 text-center">CHOOSE:</h1>
        <p className="sub-p text-center">Join the party or create your own</p>

        <Form>
          <FormGroup>
            <Label for="name-entry" className="mt-2">Name your playlist:</Label>
            <Input type="text" name="name-entry" id="name-entry" placeholder="New playlist" className="col-4 mx-auto" onChange={(e) => this.handleInputChange("playlistName", e)}/>
          </FormGroup>
        </Form>

        <button className="btn btn-primary mx-auto" onClick={() => this.addPlaylist()}>Create playlist</button>
        <button className="btn btn-primary m-3 mx-auto">Join playlist</button>

        </div>
      </div>
    )
  }
}
