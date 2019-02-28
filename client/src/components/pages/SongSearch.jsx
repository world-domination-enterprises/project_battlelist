import React, { Component } from 'react';
import ListItem from '../ListItem'
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
      error: '',
    }
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleInputChange(stateFieldName, event) {
    this.setState({
      [stateFieldName]: event.target.value
    })
  }

  handleKeyUp(e) {
    console.log('keyup triggered')
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
   }
   this.setState({
    typingTimeout: setTimeout(() => {
      console.log('Search triggered!')

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
       <h1>Search for Songs</h1>   
        <Form>
          <FormGroup>
            <Label for="song">Song</Label>
            <Input type="text" name="song" value={this.state.searchString} id="song" placeholder="Enter Song Title" onChange={(e) => this.handleInputChange("searchString", e)} onKeyUp={(e) => this.handleKeyUp(e)}/>
          </FormGroup>
        </Form>
        {this.state.results.map((song, i) => 
        <ListItem title={song.name} artist={song.artists[0].name} img={song.album.images[0].url} trackId={song.id} key={i}/>
        )}
        </div>
      )
    }
  }