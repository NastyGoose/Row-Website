import styled from 'styled-components';

export const Page = styled.div`
  padding: ${props => {
    if (props.none) return '';
    if (props.narrow) return '0vw 25vw';
    if (props.wide) return '0vw 5vw';
    return '0vw 5vw';
  }};
`;

export const Container = styled(Page)`
  display: flex;
`;

export const ItemContainer = styled.div`
  padding: ${props => {
    if (props.none) return '';
    if (props.narrow) return '25vw 25vw';
    if (props.normal) return '15vw 15vw';
    return '5vw 5vw';
  }};
`;
