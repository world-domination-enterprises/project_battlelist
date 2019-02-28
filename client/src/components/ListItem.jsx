import React, {Component} from 'react';
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import api from '../api';

export default class ListItem extends Component {
    constructor(props) {
    super(props)

    this.addSong = this.addSong.bind(this);
  }
  addSong() {
    api.postTest({
      artist: this.props.artist,
      name: this.props.title,
      songId: this.props.songId,
      releaseDate: this.props.rlsDate,
      imgUrl: this.props.img
    })
    .then(user => console.log(user))
  }
render() {
  return (
     <Row>
      <Col sm="6">
        <Card body>
          <CardTitle><strong>{this.props.title} </strong>by {this.props.artist}</CardTitle>
          <CardText><img src={this.props.img} alt="album-cover-art" className="cover-art"/></CardText>
          <Button onClick={() => this.addSong()} >Add +</Button>
        </Card>
      </Col>
      </Row>
  )
}
}
