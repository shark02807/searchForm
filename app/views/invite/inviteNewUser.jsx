import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, object } from 'prop-types';
import { invite } from 'State/invitation/invitationActions';

class InviteNewUser extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email } = this.state;
    this.props.inviteNewUser(email);
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  render() {
    const { i18n } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="email">
          {i18n.t('profile.personal-info.email')}:
          <input type="text" id="email" style={{ maxWidth: '150px' }} value={this.state.email} onChange={this.handleEmailChange} />
        </label>
        <button type="submit" className="btn ds-footer-inviteButton btn-sm">{i18n.t('invite-persons.invite-new-user')}</button>
      </form>
    );
  }
}

InviteNewUser.propTypes = {
  inviteNewUser: func.isRequired,
  i18n: object.isRequired
};

export default connect(null, {
  inviteNewUser: invite
})(InviteNewUser);
