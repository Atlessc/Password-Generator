import styled from 'styled-components';

export const Label = styled.label`
  display: block;
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: var(--spacing-sm);

  @media (max-width: 768px) {
    font-size: var(--font-size-sm); /* Smaller font size for tablets */
    margin-bottom: var(--spacing-xs); /* Adjust margin for compact spacing */
  }

  @media (max-width: 480px) {
    font-size: var(--font-size-xs); /* Further reduced font size for mobile */
    margin-bottom: var(--spacing-xxs); /* Compact margin for mobile devices */
  }
`;
