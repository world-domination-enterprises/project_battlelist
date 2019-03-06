import React, { Component } from 'react'
import { Button, CardTitle, CardText, Row, Col } from 'reactstrap';

export default class ListItemSongsearch extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showPreview: false
    }
    this.togglePreview = this.togglePreview.bind(this)
  }
  togglePreview() {
    if (this.state.showPreview) {
      this.setState({
        showPreview : false
      })
    } else {
      this.setState({
        showPreview : true
      })
    }
    }
render() {  
  return(
    <Row>
      <Col sm="12" className="d-flex">
        <div className="list-item-search-container d-flex mb-1 mt-1 mr-4 ml-4">
          <CardText>
            {this.state.showPreview ? <iframe title='track-preview' src={`https://open.spotify.com/embed/track/${this.props.songId}`} width="80px" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe> : <img src={this.props.img} alt="album-cover-art" className="cover-art" onClick={this.togglePreview}/>}
          </CardText>
          <CardTitle className="align-self-center w-100 m-0 text-left pl-3">
          <strong>{this.props.title}</strong>
          <br />{this.props.artist}
          <br /> {this.props.rlsDate}</CardTitle>
          <Button className="btn-success pl-2 pr-2" onClick={() => this.props.onSongAdd(this.props.mykey)} >Add+</Button>
          </div>
      </Col>
    </Row>
  )
}
}
