import React, { Component } from 'react'
import { Form, Label, Input } from 'reactstrap'

/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
//  TODO: disentangle functionality and move to different components
          // 1.) playlist name input
          // 2.) invited user email input 
          // 3.) songs per user input
/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

//  TODO: turn this component into name input component

export default class createplaylist extends Component {
  constructor (props) {
    super(props)
    this.state = {
      playlistName: '',
    }
  }

  render() {
    return(
      <div className='name-playlist-container'>
        <Form 
          id='name-playlist-form'
          onSubmit={(e) => this.props.onNameSubmit(e)} 
          >
          <Label for="playlist-name-entry" className="mt-2">Name your playlist:</Label>
          <Input 
            type="text"
            name="playlist-name" 
            id="playlist-name"
            value={this.props.value} 
            placeholder="Enter new playlist name" 
            className="col-4 mx-auto"
            onChange={(e) => this.props.onNameChange(e.target.value)} 
            />
        </Form>
      </div>
    )
  }
}