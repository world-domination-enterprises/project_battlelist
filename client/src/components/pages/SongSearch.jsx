import React, { Component } from 'react';
import ListItemSongsearch from '../ListItemSongsearch'
import { Form, FormGroup, Label, Input } from 'reactstrap';

export default class SongSearch extends Component {
  constructor(props)  {
    super(props)
    this.state = {
      typingTimeout: 0, 
      error: ''
    }
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault()
  }

  handleKeyUp(e) {
    if (this.state.typingTimeout || e.keyCode === 13) {
      clearTimeout(this.state.typingTimeout);
   }
   this.setState({
    typingTimeout: setTimeout(() => {
      this.props.spotifySearch()
      }, 2000) // Timeout before search is executed
    })
  }

  handleKeyDown(e) {
    e.keyCode === 13 && this.props.spotifySearch()
  }

    render() {  
      return (
        <div className='SongSearch'>
       <h1>Search for Songs</h1>   
        <Form onSubmit={(e) => this.handleSubmit(e)} >
          <FormGroup>
            <Label for="song">Song</Label>
            <Input 
              type="text" 
              name="song" 
              value={this.props.value} 
              id="song" 
              placeholder="Enter Song Title" 
              autoComplete="off"
              onChange={(e) => this.props.onSearchChange(e.target.value)} 
              onKeyUp={(e) => this.handleKeyUp(e)} 
              onKeyDown={(e) => this.handleKeyDown(e)} 
            />
          </FormGroup>
        </Form>
        {this.props.searchResults.map((song, i) => 
         <ListItemSongsearch 
          _userCurrentlyEditing={this.props.playlistId}
          triggerSongAdd={this.props.triggerSongAdd}
          title={song.name} 
          artist={song.artists[0].name} 
          img={song.album.images[0].url} 
          key={i}
          mykey={i} 
          songId={song.id} 
          rlsDate={song.album.release_date}/>
        )}
        </div>
      )
    }
  }
