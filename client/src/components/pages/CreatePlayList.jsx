import React, { Component } from 'react'
import SongSearch from './SongSearch'

export default class CreatePlayList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: null
    }
  }
  render() {
    return (
      <div>
        <SongSearch />
      </div>
    )
  }
}
