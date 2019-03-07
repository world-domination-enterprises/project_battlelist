import React, { Component } from 'react'
import { Label, Input, Button, InputGroup, InputGroupAddon } from 'reactstrap'
import InviteUserEmailsListItem from './InviteUserEmailsListItem';


export default class InviteUsers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      emailInputError: this.props.emailInputError,
    }
  }

  turnOffError(stateErrorFieldName, timeOut) {
    setTimeout(() => {
      this.setState({
        [stateErrorFieldName]: ''
      })}, timeOut)
  }

  componentDidUpdate(prevProps, prevState) {
    this.state.emailInputError && this.turnOffError('emailInputError', 1500)
  }

  componentWillUnmount() {
    clearTimeout(this.turnOffError())
  }

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
              onClick={(e) => this.props.onAddEmailClick('addEmail', e)}>+</Button>
            </InputGroupAddon>
          </InputGroup>
          {this.state.emailInputError && <div className='error'><small> {this.state.emailInputError}</small></div>}

          {this.props.inviteUserEmails[0] && <InviteUserEmailsListItem emails={this.props.inviteUserEmails} onEmailDelete={this.props.onEmailDelete}/>}
      </div>
    )
  }
}