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

          <Label for="email-entry" className="m-3">Invite your friends:</Label> <br/>
          <InputGroup className='email-input d-flex justify-content-center col-12'>
            <Input 
              type="email" 
              name="invite-user-email"
              id="invite-user-email-input" 
              placeholder="Enter friend's email address" 
              value={this.props.value} 
              onChange={(e) => this.props.onEmailChange('emailInputText',  e)}
              className="col-3"
              />
            <InputGroupAddon addonType="append">
             <Button 
              className="btn btn-success submit-email"
              form='invite-user-email-input'  
              type='button'
              onClick={(e) => this.props.onAddEmailClick('addEmail', e)}>+</Button>
            </InputGroupAddon>
          </InputGroup>
          {this.state.emailInputError && <div className='error'><small> {this.state.emailInputError}</small></div>}

          {this.props.emailInputError && <small className="text-danger"> {this.props.emailInputError}</small>}

          {this.props.inviteUserEmails[0] && <InviteUserEmailsListItem emails={this.props.inviteUserEmails} onEmailDelete={this.props.onEmailDelete}/>}
      </div>
    )
  }
}