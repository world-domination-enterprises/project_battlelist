import React from 'react';
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';


export default function ListItem(props) {
  return (
     <Row>
      <Col sm="6">
        <Card body>
          <CardTitle>{props.title}</CardTitle>
          <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
          <Button>Go somewhere</Button>
        </Card>
      </Col>
      </Row>
  )
}
