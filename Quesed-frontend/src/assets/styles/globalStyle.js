import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  #root {
    min-height: 100vh;
    font-family: 'Roboto', sans-serif;
    font-size: 1.2em;
    font-weight: 400;
    background: ${props => props.theme.body};
    color: ${props => props.theme.text.color}
  }
  body {
    margin: 0;
    padding: 0;
  }
`;

export default GlobalStyle;
