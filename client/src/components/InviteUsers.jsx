import React, { Component } from 'react'
import { Label, Input, Button, InputGroup, InputGroupAddon } from 'reactstrap'
// import InviteUserEmailsListItem from './InviteUserEmailsListItem';


export default class InviteUsers extends Component {
  render() {
    return (
      <div className='invite-users-container'>

          <Label for="email-entry" className="mt-2">Invite your friends:</Label> <br/>
          <small>You and {this.props['inviteUserEmails'].length} friend{this.props['inviteUserEmails'].length!==  1 && 's'} will edit the playlist.</small>
          <InputGroup className='email-input'>
            <Input 
              type="email" 
              name="invite-user-email"
              id="invite-user-email-input" 
              placeholder="Enter friend's email address" 
              value={this.props.value} 
              onChange={(e) => this.props.onEmailChange('emailInputText',  e)}
              />
            <InputGroupAddon addonType="append">
             <Button 
              className="btn btn-primary submit-email"
              form='invite-user-email-input'  
              type='button'
              onClick={(e) => this.props.onAddEmailClick('inviteUserEmails', e)}>+</Button>
            </InputGroupAddon>
          </InputGroup>
          {this.props.emailInputError && <div className='error'><small> {this.props.emailInputError}</small></div>}


          {/* render InviteUserEmailsListItem to display user emails that were already added to to invite list  */}
          {/* TODO: propsName
          {props.propsName.inviteUserEmails && <InviteUserEmailsListItem emails={this.state.inviteUserEmail/>}
           */}
      </div>
    )
  }
}
