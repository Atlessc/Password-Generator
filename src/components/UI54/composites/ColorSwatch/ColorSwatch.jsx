/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { CodeInline } from '../StyledComponents';

export const ColorSwatch = ({ name, hex }) => (
  <SwatchContainer>
    <SwatchCircle style={{ backgroundColor: hex }} />
    <p>{name}</p>
    <StyledCodeInline>{hex}</StyledCodeInline>
  </SwatchContainer>
);

const SwatchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  max-width: 150px;
  margin: 1rem;
`;

const SwatchCircle = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border: 1px solid white;
  margin-bottom: 0.5rem;
`;

const StyledCodeInline = styled(CodeInline)`
  font-family: monospace;
  background-color: #f0f0f0;
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  color: #333;
`;
