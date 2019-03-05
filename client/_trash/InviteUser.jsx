import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import inviteUserEmails from './inviteUserEmails'


export default class InviteUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inviteUserEmails: [],
    }
  }

  render() {
    return (
      <div id='invite-user-container'>

      {/* <Form id='invite-user-email-form' } >
        
      </Form> */}
      

      </div>
    )
  }
}