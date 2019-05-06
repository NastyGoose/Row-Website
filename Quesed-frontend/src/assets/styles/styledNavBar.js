import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';

export const NavBarLogo = styled(Link)`
  display: inline-block;
  text-decoration-line: none;
  padding-top: 0.3125rem;
  padding-bottom: 0.3125rem;
  margin-right: 1rem;
  font-size: 1.5rem;
  line-height: inherit;
  white-space: nowrap;
`;

export const NavBarItem = styled(NavLink).attrs(props => ({
  activeStyle: {
    fontWeight: props.theme.link.activeFontWeight,
    color: props.theme.link.activeColor
  }
}))`
  text-decoration-line: none;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  color: ${props => props.theme.link.color};

  &:hover {
    color: ${props => props.theme.link.hoverColor};
  }
`;

export const NavBarContainer = styled.nav`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: ${props => {
    if (props.left) return 'flex-start';
    if (props.right) return 'flex-end';
    return 'space-between';
  }};
  padding: 0.5rem 1rem;
  min-height: 7vh;
  margin-bottom: 30px;
  background: ${props => props.theme.navBar.bgColor};
`;

export const NavBarContent = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
