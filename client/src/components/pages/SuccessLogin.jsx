import React, { Component } from 'react'
import api from '../../api';

export default class SuccessLogin extends Component {
  render() {
    return (
      <div>
        <h1>Login Succesful!</h1>
        <p>You are going to be redirected in 3 seconds</p>
      </div>
    )
  }
  componentDidMount() {
    api.getProfile()
    .then(() => {
      setTimeout(() => {
        let url = "/"
        if (api.getLastPlaylistVisited())
          url = "/playlist/" + api.getLastPlaylistVisited()
          
        // Redirect the user to the url
        this.props.history.push(url)
      }, 3000)
    })
  }
}
