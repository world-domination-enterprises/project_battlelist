import React from 'react'
import { ListGroup, ListGroupItem, Button } from 'reactstrap';

export default function inviteUserEmails(props) {
  return (
    <div id='invited-user-emails-container'>
      {props.emails.map((email, i) => 
        <ListGroup id='invited-user-emails-list' className='email-input' >
          <ListGroupItem id='invited-user-emails-list-item' key={i}>{email}<Button color='secondary'>—</Button></ListGroupItem>
        </ListGroup>
      )}
    </div>
  )
}
