import styled, { css } from 'styled-components';

const columns = {
  five: 1800,
  four: 1500,
  three: 1200,
  two: 900,
  one: 600,
};

// iterate through the sizes and create a media template
const mewMedia = Object.keys(columns).reduce((accumulator, label) => {
  const emSize = columns[label] / 16;
  accumulator[label] = (...args) => css`
    @media (max-width: ${emSize}em) {
      ${css(...args)};
    }
  `;
  return accumulator;
}, {});

export const GridContainer = styled.div`
  display: grid;
  grid-gap: 20px;
  justify-content: ${(props) => {
    if (props.left) return 'left';
    if (props.right) return 'right';
    return 'center';
  }};
  background-color: transparent;
  padding: 0px;
  
  ${mewMedia.five`grid-template-columns: auto auto auto auto auto;`}
  ${mewMedia.four`grid-template-columns: auto auto auto auto;`}
  ${mewMedia.three`grid-template-columns: auto auto auto;`}
  ${mewMedia.two`grid-template-columns: auto auto;`}
  ${mewMedia.one`grid-template-columns: auto;`}
`;

export const GridItem = styled.div`
  place-self: center;
`;
