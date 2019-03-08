import React from 'react'
import { ListGroup, ListGroupItem, Button } from 'reactstrap';

export default function InviteUserEmailsListItem(props) {
  return (
    // TODO --- IMPORTANT: this needs to be styled
    <div id='invited-user-emails-container'>
      <ListGroup id='invited-user-emails-list' className='email-input' >
        {props.emails.map((email, i) => 
          <ListGroupItem 
            id='invited-user-emails-list-item' 
            key={i}>{email}
            <Button 
              color='secondary'
              onClick={(i) => props.onEmailDelete(i)}
              >—</Button>
          </ListGroupItem>)}
      </ListGroup>
    </div>
  )
}