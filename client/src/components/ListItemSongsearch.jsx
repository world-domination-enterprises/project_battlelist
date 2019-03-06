import React from 'react';
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';

export default function ListItemSongsearch (props) {

  return(
    <Row>
      <Col sm="12" className="d-flex">
        <div className="list-item-search-container d-flex m-1">
          <CardText>
            <img src={props.img} alt="album-cover-art" className="cover-art"/>
          </CardText>
          <CardTitle className="align-self-center w-100 m-0 text-left pl-3">
          <strong>{props.title}</strong>
          <br />{props.artist}
          <br /> {props.rlsDate}</CardTitle>
          <Button className="btn-success pl-2 pr-2" onClick={() => props.onSongAdd(props.mykey)} >Add+</Button>
          </div>
      </Col>
    </Row>
  )
}
