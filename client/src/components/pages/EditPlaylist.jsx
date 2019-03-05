import React, { Component } from 'react'
import SongSearch from './SongSearch'
import PlayList from '../PlayList'

export default class CreatePlayList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: null,
      refresh: false,
    }
  }
  // componentDidUpdate() {
  //   this.state.refresh && this.turnOfRefresh()
  // }
  // turnOfRefresh (){
  //   this.setState({
  //     refresh: false
  //   })
  // }
  // refreshPl() {
  //   this.setState({
  //     refresh: true
  //   })
  //   console.log('refreshPL in editplaylist called')
  // }
  render() {
    return (
      <div className="search-pl-container">
        <SongSearch refreshPlaylist={this.refreshPl()}/>
        <PlayList refreshPlaylist={this.state.refresh}/>
      </div>
    )
  }
}
