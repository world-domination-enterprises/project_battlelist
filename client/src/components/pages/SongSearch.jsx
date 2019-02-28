import React, { Component } from 'react';
// import ListItem from '../ListItem'
import { Form, FormGroup, Label, Input } from 'reactstrap';
import SpotifyWebApi from 'spotify-web-api-node'
import api from '../../api';

export default class SongSearch extends Component {
  constructor(props)  {
    super(props)
    this.state = {
      searchString: '',
      accessToken: '',
      error: '',
    }
  }

  handleInputChange(stateFieldName, event) {
    
    this.setState({
      [stateFieldName]: event.target.value
    })
    
    const spotifyApi = new SpotifyWebApi()
      // {clientId: process.env.SPOTIFY_CLIENT_ID,
      // clientSecret: process.env.SPOTIFY_CLIENT_SECRET,}
    
    
    setTimeout(() => {

    const { searchString } = this.state
      
      // api.getProfile()
      //  .then(user => {
      //   console.log('TCL: user', user)
      //   this.setState({
      //     refreshToken: user.refreshToken
      //   })
  
      api.refreshAndFetchAccessToken()
        .then(data => {
          console.log('TCL: data', data)
          this.setState({
            accessToken: data.body.access_token,
          })
          spotifyApi.setAccessToken(this.state.accessToken);
          spotifyApi.searchTracks(searchString)
            .then(data => {
              console.log('YEAH: SongData!!!', JSON.stringify(data, null, 2))
              })
            .catch(err => console.log(err))
        .catch(err => console.log(err))
        })    
      }, 3000)
  }


  // componentDidMount() {
  //   const spotifyApi = new SpotifyWebApi()
  //     // {clientId: process.env.SPOTIFY_CLIENT_ID,
  //     // clientSecret: process.env.SPOTIFY_CLIENT_SECRET,}

  //   const { searchString } = this.state
    
  //   // api.getProfile()
  //   //  .then(user => {
  //   //   console.log('TCL: user', user)
  //   //   this.setState({
  //   //     refreshToken: user.refreshToken
  //   //   })

  //   api.refreshAndFetchAccessToken()
  //     .then(data => {
	// 			console.log('TCL: data', data)
  //       this.setState({
  //         accessToken: data.body.access_token,
  //       })
  //       spotifyApi.setAccessToken(this.state.accessToken);
  //       spotifyApi.searchTracks(searchString)
  //         .then(data => {
  //           console.log('YEAH: SongData!!!', JSON.stringify(data, null, 2))
  //           })
  //         .catch(err => console.log(err))
  //     .catch(err => console.log(err))
  //     })    
  //   }

  render() {
    // let possibleSongs = []

    // {possibleSongs.map((song, i) => 
    //  <ListItem title={song.state.title} artist={song.state.artist} key={i}/>)} 

    return (
      <div className='SongSearch'>
      <Form>
        <FormGroup>
          <Label for="song">Song</Label>
          <Input type="text" name="song" value={this.state.searchString} id="song" placeholder="Enter Song Title" onChange={(e) => this.handleInputChange("searchString", e)} />
        </FormGroup>
      </Form>
      </div>
    )
  }
}  