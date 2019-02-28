// import React, { Component } from 'react'
// import api from '../../api';
// import { Form, FormGroup, Label, Input } from 'reactstrap';
// import ListItem from '../ListItem'

// export default class Test extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       token: null,
//       results: [],
//       searchString: '',
//       typingTimeout: 0
//     }
//     this.handleKeyUp = this.keyUpHandler.bind(this);
//   }
//   handleInputChange(event) {
//     this.setState({
//       searchString: event.target.value
//     })
//   }
//   keyUpHandler = (event) => {
//     console.log('keyup triggered')
//     if (this.state.typingTimeout) {
//       clearTimeout(this.state.typingTimeout);
//    }
//    this.setState({
//     typingTimeout: setTimeout(() => {
//       console.log('Search triggered!')
//       fetch(`https://api.spotify.com/v1/search?q=${this.state.searchString}&type=track`, {
//         headers: {'Authorization': 'Bearer ' + this.state.token}
//       }).then(res => res.json())
//       .then(data => this.setState({
//         results: data.tracks.items
//       })
//       )
//       }, 2000) // Timeout before search is executed
//     })
//   }
//   render() {
//     return (
//       <div className="test">
//         <h1>Search test:</h1>
//         <Form>
//         <FormGroup>
//           <Label for="song">Song</Label>
//           <Input type="text" name="song" value={this.state.songTitle} id="song" placeholder="Enter Song Title" onChange={(e) => this.handleInputChange(e)} onKeyUp={(e) => this.handleKeyUp(e)} />
//         </FormGroup>
//       </Form>
//       {this.state.results.map((song, i) => 
//       <ListItem title={song.name} artist={song.artists[0].name} img={song.album.images[0].url} key={i} songId={song.id}  rlsDate={song.album.release_date}
//       />
//       )}
//       </div>
//     )
//   }
//   componentDidMount() {
//     api.getProfile()
//     .then(user => {
//       this.setState({
//         token: user.accessToken
//        })
//     })
//   }
// }
