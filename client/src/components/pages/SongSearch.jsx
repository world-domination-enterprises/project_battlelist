import React, { Component } from 'react';
import ListItemSongsearch from '../ListItemSongsearch'
import { Form, FormGroup, Label, Input } from 'reactstrap';
import SpotifyWebApi from 'spotify-web-api-node'
import api from '../../api';

export default class SongSearch extends Component {
  constructor(props)  {
    super(props)
    this.state = {
      searchString: '',
      accessToken: '',
      results: [],
      typingTimeout: 0,
      error: ''
    }
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault()
  }

  handleInputChange(stateFieldName, event) {
    this.setState({
      [stateFieldName]: event.target.value
    })
  }

  handleKeyUp(e) {
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
   }
   this.setState({
    typingTimeout: setTimeout(() => {

      const spotifyApi = new SpotifyWebApi()

      spotifyApi.setAccessToken(this.state.accessToken);
      spotifyApi.searchTracks(this.state.searchString, {limit: 10,})
        .then(data => {
          JSON.stringify(data, null, 2)
					console.log('TCL: SongSearch -> handleKeyUp -> data', data)
          this.setState({
          results: data.body.tracks.items
          })
        })
      }, 2000) // Timeout before search is executed
    })
  }
  componentDidMount() {
    api.refreshAndFetchAccessToken()
      .then(data => {
        console.log('TCL: data', data)
        this.setState({
          accessToken: data.body.access_token,
        })
      })
    }  
    render() {  
      return (
        <div className='SongSearch'>
       <h1 onClick={this.props.refreshPlaylist}>Search for Songs</h1>   
        <Form onSubmit={(e) => this.handleSubmit(e)} >
          <FormGroup>
            <Label for="song">Song</Label>
            <Input type="text" name="song" value={this.state.searchString} id="song" placeholder="Enter Song Title" onChange={(e) => this.handleInputChange("searchString", e)} onKeyUp={(e) => this.handleKeyUp(e)} />
          </FormGroup>
        </Form>
        {this.state.results.map((song, i) => 
         <ListItemSongsearch refreshList={this.props.refreshPlaylist} title={song.name} artist={song.artists[0].name} img={song.album.images[0].url} key={i} songId={song.id} rlsDate={song.album.release_date}/>
        )}
        </div>
      )
    }
  }
