import React, {Component} from 'react';
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import api from '../api';

export default class ListItemSongsearch extends Component {
    constructor(props) {
    super(props)
    this.state = {
      userCurrentlyEditing: null
    }
    this.addSong = this.addSong.bind(this);
  }

  addSong() {
    api.postSong({
      artist: this.props.artist,
      name: this.props.title,
      songId: this.props.songId,
      releaseDate: this.props.rlsDate,
      imgUrl: this.props.img,
      _PLtoAddSongTo: this.state.userCurrentlyEditing,
    })
    .then(playlistUpdated =>
		console.log('TCL: ListItemSongsearch -> addSong -> playlistUpdated', playlistUpdated))
  }

  componentDidMount() {
    api.getProfile()
      .then(user => {
				console.log('TCL: ListItemSongsearch -> componentDidMount -> user', user)
        this.setState({
          userCurrentlyEditing: user._currentlyEditing
        })
      })
    }

render() {
  return (
     <Row>
      <Col sm="6">
        <Card body>
          <CardTitle><strong>{this.props.title} </strong>by {this.props.artist}</CardTitle>
          <CardText><img src={this.props.img} alt="album-cover-art" className="cover-art"/></CardText>
          <iframe title='track-preview' src={`https://open.spotify.com/embed/track/${this.props.songId}`} width="300" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
          <Button onClick={() => this.addSong()} >Add +</Button>
        </Card>
      </Col>
      </Row>
  )
}
}
