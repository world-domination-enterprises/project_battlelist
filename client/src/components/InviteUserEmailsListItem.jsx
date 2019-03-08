import React from 'react'
import { ListGroup, ListGroupItem, Button } from 'reactstrap';

export default function InviteUserEmailsListItem(props) {
  return (
    // TODO --- IMPORTANT: this needs to be styled
    <div id='invited-user-emails-container'>
      <ListGroup id='invited-user-emails-list' className='email-input col-4 mx-auto p-0 m-0' >
        {props.emails.map((email, i) => 
          <ListGroupItem 
           className="invited-user-emails-list-item"
            id='invited-user-emails-list-item' 
            key={i}>{email}
            <Button 
              className="btn btn-danger m-2"               
              onClick={(i) => props.onEmailDelete(i)}
              >-</Button>
          </ListGroupItem>)}
      </ListGroup>
    </div>
  )
}