/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faEye,
  faPlus,
  faEdit,
  faCheck,
  faTimes,
  faThumbsUp,
  faThumbsDown,
  faCheckDouble,
  faClipboardCheck,
} from '@fortawesome/free-solid-svg-icons';
import { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';

import NavBar from './components/navBar';
import RegistrationPage from './components/pages/registrationPage';
import LoginPage from './components/pages/loginPage';
import Logout from './components/logout';
import NotFoundPage from './components/pages/notFoundPage';
import TestsPage from './components/pages/testsPage';
import TestPage from './components/pages/testPage';
import Editor from './components/pages/editor';
import Profile from './components/pages/profile/profile';
import Users from './components/pages/users/users';
import Patches from './components/pages/patches/patches';
import Patch from './components/pages/patches/patch';
import PatchEditor from './components/pages/patches/patchEditor';

import { getCurrentUser } from './services/authService';
import userTypes from './types/userTypes';

import GlobalStyle from './assets/styles/globalStyle';
import themes from './assets/styles/themes';
import 'react-toastify/dist/ReactToastify.css';

library.add(
  faEye,
  faEdit,
  faPlus,
  faCheck,
  faTimes,
  faThumbsUp,
  faThumbsDown,
  faCheckDouble,
  faClipboardCheck,
);

class App extends Component {
  state = {
    theme: themes.mutedTones,
    user: {
      email: '',
      name: 'Guest',
      permission: userTypes.guest,
      reputation: 0,
      _id: '',
    },
  };

  componentDidMount = () => {
    const user = getCurrentUser();
    if (!user) {
      this.setState({
        user: {
          email: '',
          name: 'Guest',
          permission: userTypes.guest,
          reputation: 0,
          _id: '',
        },
      });
    } else {
      this.setState({ user });
    }
  };

  render() {
    const { theme, user } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <GlobalStyle />
          <ToastContainer />
          <NavBar />
          <Switch>
            <Route path="/register" component={RegistrationPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/logout" component={Logout} />
            <Route
              path="/tests/:id"
              render={props => <TestPage {...props} permission={user.permission} />}
            />
            <Route
              path="/tests"
              render={props => (
                <TestsPage {...props} permission={user.permission} login={user.name} />
              )}
            />
            <Route
              path="/editor/:id"
              render={props => <Editor {...props} permission={user.permission} />}
            />
            <Route
              path="/editor"
              render={props => <Editor {...props} permission={user.permission} />}
            />
            <Route path="/profile" render={props => <Profile {...props} email={user.email} />} />
            <Route path="/users/:id" component={Profile} />
            <Route path="/users" component={Users} />
            <Route path="/patches/:id" component={Patch} />
            <Route path="/patches" component={Patches} />
            <Route path="/patch-editor" component={PatchEditor} />
            <Route path="/not-found" component={NotFoundPage} />
            <Redirect from="/" exact to="/tests" />
            <Redirect to="/not-found" />
          </Switch>
        </React.Fragment>
      </ThemeProvider>
    );
  }
}

export default App;
