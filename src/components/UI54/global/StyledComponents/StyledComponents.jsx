import styled from 'styled-components';

export const H1 = styled.h1`
  font-size: 2.25rem;
  font-weight: 700;
  color: #FFC0CB;
  margin: 1.5rem 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 1.875rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

export const H2 = styled.h2`
  font-size: 1.875rem;
  font-weight: 600;
  color: #FFC0CB;
  margin: 1rem 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
`;

export const H3 = styled.h3`
  font-size: 1.5rem;
  font-weight: 500;
  color: #FFC0CB;
  margin: 1rem 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

export const BoldText = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: #fff !important;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

export const Text = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: #fff !important;
  margin: 0.5rem 0;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

export const SmallText = styled.p`
  font-size: 0.875rem;
  font-weight: 400;
  color: #737373;
  margin: 0.5rem 0;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }

  @media (max-width: 480px) {
    font-size: 0.625rem;
  }
`;

export const CodeInline = styled.code`
  display: inline;
  background-color: #111827;
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  color: #ffc0cb;
  padding: 4px;
  border: 1px solid #ffc0cb;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }

  @media (max-width: 480px) {
    font-size: 0.625rem;
  }
`;
