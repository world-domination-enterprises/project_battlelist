import React, { Component } from 'react';
import ListItem from '../ListItem'
import { Form, FormGroup, Label, Input } from 'reactstrap';

export default class SongSearch extends Component {
  constructor(props)  {
    super(props)
    this.state = {
      title: '',
      artist: '',
      year: '',
      genres: [],
      picture: '' 
    }
  }
  render() {
    let possibleSongs = []

    return (
      <div className='SongSearch'>
      <Form>
        <FormGroup>
          <Label for="song">Song</Label>
          <Input type="text" name="song" id="song" placeholder="Enter Song Title" />
        </FormGroup>
      </Form>
      {possibleSongs.map((song, i) => 
      <ListItem title={song.state.title} artist={song.state.artist} key={i}/>
      )}
      </div>
    )
  }
}
