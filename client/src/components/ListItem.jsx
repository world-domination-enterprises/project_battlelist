import React from 'react';
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';


export default function ListItem(props) {
  return (
     <Row>
      <Col sm="6">
        <Card body>
          <CardTitle><strong>{props.title} </strong>by {props.artist}</CardTitle>
          <CardText><img src={props.img} alt="album-cover-art" className="cover-art"/></CardText>
          <Button>Add +</Button>
        </Card>
      </Col>
      </Row>
  )
}
