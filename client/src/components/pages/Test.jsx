import React, { Component } from 'react'
import api from '../../api';

export default class Test extends Component {
  constructor(props) {
    super(props)
    this.state = {
      result: null
    }
  }
  render() {
    return (
      <div className="ProfilePage">
        <h1>Profile</h1>
        {/* <p>{this.state.result}</p> */}
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    )
  }
  componentDidMount() {
    api.getTest()
      .then(result => {
        console.log('teeessstt',result)
      })
  }
}
