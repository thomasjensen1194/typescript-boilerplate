import styled from 'styled-components';

export const CenterText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const LargeText = styled.p`
  font-size: 2em;
  text-align: center;

  @media (max-width: 500px) {
    font-size: 1.5em;
    margin: 1em;
  }
`;
