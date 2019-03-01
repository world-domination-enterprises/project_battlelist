import React, { Component } from 'react'
import { Form, FormGroup, Label, Input } from 'reactstrap';

export default class ChoosePlaylist extends Component {
  constructor (props) {
    super(props)
    this.state = {
      playlistName: '',
      start: null,
      end: null,
      numberOfSongs: 1
    }
  }
  handleInputChange(stateFieldName, event) {
    this.setState({
      [stateFieldName]: event.target.value
    })
  }
  render() {
    return (
      <div className="container row w-100 mx-auto">
        <div class="col-12 main-page-container d-flex flex-column align-self-center mx-auto">
        <h1 class="main-h1 text-center">CHOOSE:</h1>
        <p class="sub-p text-center">Join the party or create your own</p>

        <Form>
          <FormGroup>
            <Label for="name-entry" className="mt-2">Name your playlist:</Label>
            <Input type="text" name="name-entry" id="name-entry" placeholder="New playlist" className="col-4 mx-auto" onChange={(e) => this.handleInputChange("playlistName", e)}/>
          </FormGroup>
        </Form>

        <a href="http://localhost:3000/createplaylist"><button className="btn btn-primary mx-auto">Create playlist</button></a>
        <button className="btn btn-primary m-3 mx-auto">Join playlist</button>

        </div>
      </div>
    )
  }
}
