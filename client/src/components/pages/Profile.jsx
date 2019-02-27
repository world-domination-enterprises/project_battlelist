import React, { Component } from 'react';
import api from '../../api';

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null
    }
  }
  render() {
    return (
      <div className="ProfilePage">
        <h1>Profile</h1>
        <pre>{JSON.stringify(this.state.user, null, 2)}</pre>
      </div>
    )
  }
  componentDidMount() {
    api.getProfile()
      .then(user => {
        this.setState({
          user
        })
      })
  }
}
