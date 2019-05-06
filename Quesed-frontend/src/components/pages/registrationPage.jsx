import React, { PureComponent } from 'react';
import RegistrationForm from '../forms/registrationForm';
import { Page } from '../../assets/styles';
import { saveUser } from '../../services/userService';
import { loginWithJwt } from '../../services/authService';

class RegistrationPage extends PureComponent {
  handleSubmit = async (data) => {
    const { headers } = await saveUser(data);
    loginWithJwt(headers['x-auth-token']);
    window.location = '/';
  };

  render() {
    return (
      <Page narrow>
        <h2>Registration</h2>
        <RegistrationForm onSubmit={this.handleSubmit} />
      </Page>
    );
  }
}

export default RegistrationPage;
