import React, { PureComponent } from 'react';
import { Page } from '../../assets/styles';
import LoginForm from '../forms/loginForm';
import { login, getJwt } from '../../services/authService';
import { setJwt } from '../../services/httpService';

class LoginPage extends PureComponent {
  handleSubmit = async (data) => {
    await login(data.login, data.password);
    setJwt(getJwt());
    window.location = '/';
  };

  render() {
    return (
      <Page narrow>
        <h2>Login</h2>
        <LoginForm onSubmit={this.handleSubmit} />
      </Page>
    );
  }
}

export default LoginPage;
