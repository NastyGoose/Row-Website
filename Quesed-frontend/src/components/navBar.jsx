import React from 'react';

import {
  NavBarContainer,
  NavBarContent,
  NavBarLogo as LogoLink,
  NavBarItem as ItemLink,
} from '../assets/styles/index';

const NavBar = () => (
  <NavBarContainer>
    <LogoLink to="/">Quesed</LogoLink>

    <NavBarContent>
      <ItemLink to="/patches">Patches</ItemLink>
      <ItemLink to="/users">Users</ItemLink>
      <ItemLink to="/tests">Tests</ItemLink>
      <ItemLink to="/editor">Editor</ItemLink>
      <ItemLink to="/profile">Profile</ItemLink>
      <ItemLink to="/register">Register</ItemLink>
      <ItemLink to="/login">Login</ItemLink>
      <ItemLink to="/logout">Logout</ItemLink>
    </NavBarContent>
  </NavBarContainer>
);

export default NavBar;
