import React from 'react'
import { InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';

export default function inviteUserEmails(props) {
  return (
    <div id='invited-user-emails-container'>
      {props.emails.map((email, i) => 
        <InputGroup className='email-input' key={i} >
          <Input value={email} />
          <InputGroupAddon addonType="append">
            <Button size='sm'>Edit</Button>
          </InputGroupAddon>
          <InputGroupAddon addonType="append">
            <Button size='sm'>—</Button>
          </InputGroupAddon>
        </InputGroup>
      )}
    </div>
  )
}
