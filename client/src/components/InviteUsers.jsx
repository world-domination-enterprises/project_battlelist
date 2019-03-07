import React, { Component } from 'react'
import { Label, Input, Button, InputGroup, InputGroupAddon } from 'reactstrap'
// import InviteUserEmailsListItem from './InviteUserEmailsListItem';


export default class InviteUsers extends Component {
  render() {
    return (
      <div className='invite-users-container'>

          <Label for="email-entry" className="m-3">Invite your friends:</Label> <br/>
          <InputGroup className='email-input d-flex justify-content-center'>
            <Input 
              type="email" 
              name="invite-user-email"
              id="invite-user-email-input" 
              placeholder="Enter friend's email address" 
              value={this.props.value} 
              onChange={(e) => this.props.onEmailChange('emailInputText',  e)}
              className="col-4"
              />
            <InputGroupAddon addonType="append">
             <Button 
              className="btn btn-success submit-email"
              form='invite-user-email-input'  
              type='button'
              onClick={(e) => this.props.onAddEmailClick('inviteUserEmails', e)}>+</Button>
            </InputGroupAddon>
          </InputGroup>
          <small>You and {this.props['inviteUserEmails'].length} friend{this.props['inviteUserEmails'].length!==  1 && 's'} will edit the playlist.</small><br/>
          {this.props.emailInputError && <small className="text-danger"> {this.props.emailInputError}</small>}


          {/* render InviteUserEmailsListItem to display user emails that were already added to to invite list  */}
          {/* TODO: propsName
          {props.propsName.inviteUserEmails && <InviteUserEmailsListItem emails={this.state.inviteUserEmail/>}
           */}
      </div>
    )
  }
}
