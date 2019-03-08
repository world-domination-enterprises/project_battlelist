import React from 'react'
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap'
import { Link } from 'react-router-dom'

export default function SelectPage() {
  return (
    <div className='select-page-container'>
      <h1>You can do one of the following:</h1>
      <ListGroup>
        <Link to='/create-playlist' className='select-page-link'>
        <ListGroupItem>
          <ListGroupItemHeading>Create a playlist</ListGroupItemHeading>
          <ListGroupItemText>
          Create a new playlist and decide how many songs each user will be able to add. Don't forget to invite your friends!
          </ListGroupItemText>
        </ListGroupItem>
        </Link>
        <ListGroupItem>
          <ListGroupItemHeading>Manage your playlists</ListGroupItemHeading>
          <ListGroupItemText>
          See all the playlists you've hosted or been invited to. From here you can edit them, delete them or find them on Spotify.
          </ListGroupItemText>
        </ListGroupItem>
        <ListGroupItem>
          <ListGroupItemHeading>Logout</ListGroupItemHeading>
          <ListGroupItemText>
          Enough playlist fun for today? This is your way out. Hope to see you back soon!
          </ListGroupItemText>
        </ListGroupItem>
      </ListGroup>
    </div>
  )
}
