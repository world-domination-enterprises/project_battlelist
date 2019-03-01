import React, { Component } from 'react'

export default class ChoosePlaylist extends Component {
  constructor (props) {
    super(props)
    this.state = {
      start: null,
      end: null,
      numberOfSongs: 1
    }
  }
  render() {
    return (
      <div className="container row w-100 mx-auto">
        <div class="col-12 main-page-container d-flex flex-column align-self-center mx-auto">
        <h1 class="main-h1 text-center">CHOOSE:</h1>
        <p class="sub-p text-center">Join the party or create your own</p>

        <a href="http://localhost:3000/createplaylist"><button className="btn btn-primary mx-auto">Create playlist</button></a>
        <button className="btn btn-primary m-3 mx-auto">Join playlist</button>

        </div>
      </div>
    )
  }
}
