import React, { Component } from 'react';
// import ListItem from '../ListItem'
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { SpotifyWebApi } from 'spotify-web-api-js'
import api from '../../api';

export default class SongSearch extends Component {
  constructor(props)  {
    super(props)
    this.state = {
      searchString: '',
      refreshToken: '',
    }
  }

  handleInputChange(stateFieldName, event) {
    this.setState({
      [stateFieldName]: event.target.value
    })
  }

  componentDidMount() {
    const spotifyApi = new SpotifyWebApi()
    const { searchString } = this.state
    
    api.getProfile()
     .then(user => {
      console.log('TCL: user', user)
      this.setState({
        refreshToken: user.refreshToken
      })

    spotifyApi.setRefreshToken(this.state.refreshToken);
    spotifyApi.refreshAccessToken()
      .then(data => {
        spotifyApi.setAccessToken(data.body.access_token);
        spotifyApi.searchTracks(searchString)
        .then(data => {
          console.log('YEAH: SongData!!!', data)
          res.json(data)
          // res.render('/test', {
          //   data: JSON.stringify(data, null, 2)
          // });
          })
        .catch(err => next(err));
        })
      .catch(err => next(err));
    })
    .catch(err => next(err));

  render() {
    // let possibleSongs = []

    return (
      <div className='SongSearch'>
      <Form>
        <FormGroup>
          <Label for="song">Song</Label>
          <Input type="text" name="song" value={this.state.songTitle} id="song" placeholder="Enter Song Title" onChange={(e) => this.handleInputChange("songTitle", e)} />
        </FormGroup>
      </Form>
      
      </div>
    )
  }


{/* {possibleSongs.map((song, i) => 
      <ListItem title={song.state.title} artist={song.state.artist} key={i}/>
      )} */}
