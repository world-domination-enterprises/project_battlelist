import React from 'react'
import { Input, Label } from 'reactstrap'

export default function MaxSongs(props) {
  return (
    <div className='max-songs-container'>
      <Label for='max-songs'>Maximum Songs per User:</Label>
      <Input 
        type="number" 
        name="max-songs"
        id="max-songs" 
        placeholder="enter a number" 
        value={props.value}
        onChange={(e) => props.onMaxSongsChange('maxSongsPerUser',  e)}
        />
    </div>
  )
}
