import React, { Component } from 'react'
import SongSearch from './SongSearch'
import PlayList from '../PlayList'

export default class CreatePlayList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: null
    }
  }
  render() {
    return (
      <div className="search-pl-container">
        <SongSearch />
        <PlayList />
      </div>
    )
  }
}
