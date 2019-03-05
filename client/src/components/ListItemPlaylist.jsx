import React from 'react';
import { Row, Col } from 'reactstrap';

export default function ListItemPlaylist(props) {
    return (
       <Row>
        <Col sm="12">
            <div className="iframe-wrapper d-flex justify-content-center pl-4 pr-4 pb-2">
            <iframe title='track-preview' src={`https://open.spotify.com/embed/track/${props.songId}`} width="100%" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            <button className="btn btn-danger" onClick={props.deleteItem}>X</button>
            </div>
        </Col>
        </Row>
    )
  }