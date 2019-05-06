import styled from 'styled-components';

export const Button = styled.button`
  cursor: pointer;
  padding-top: 0.375rem;
  padding-right: 0.75rem;
  padding-bottom: 0.375rem;
  padding-left: 0.75rem;

  margin: ${props => (props.nomargin ? '' : '0.375rem 0.75rem 0.375rem 0.75rem')};

  border-width: ${props => (props.border ? '1' : '')};
  border-top-style: solid;
  border-right-style: solid;
  border-bottom-style: solid;
  border-left-style: solid;

  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;

  border-color: ${props => props.theme.button.borderColor};

  user-select: none;
  font-size: 1rem;

  background: ${props => props.theme.button.bgColor};
  color: ${props => props.theme.button.color};

  &:hover {
    color: ${props => props.theme.button.color};
    background-color: ${props => props.theme.button.hoverColor};
    border-color: ${props => props.theme.button.hoverColor};
  }

  &:focus {
    outline: 0;
  }

  &:active {
    background-color: ${props => props.theme.button.activeColor};
    border-color: ${props => props.theme.button.activeColor};
    color: ${props => props.theme.button.color};
  }
`;
