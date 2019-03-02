import React from 'react';
import { Card, CardTitle, CardText, Row, Col } from 'reactstrap';

export default function UserSelectedSongs(props) {
    return (
       <Row>
        <Col sm="6">
          <Card body>
            <CardTitle><strong>{props.title} </strong>by {props.artist}</CardTitle>
            <CardText><img src={props.img} alt="album-cover-art" className="cover-art"/></CardText>
            <iframe title='track-preview' src={`https://open.spotify.com/embed/track/${props.songId}`} width="300" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
          </Card>
        </Col>
        </Row>
    )
  }