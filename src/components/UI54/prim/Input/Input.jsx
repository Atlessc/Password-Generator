import styled from 'styled-components';

export const Input = styled.input`
  background-color: var(--color-secondary);
  border: var(--border-width) solid var(--color-border);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  color: var(--color-text);
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
  width: 100%;
  margin: var(--spacing-sm) 0;
  box-sizing: border-box;
  z-index: 1;

  &::placeholder {
    color: var(--color-placeholder);
  }

  @media (max-width: 768px) {
    padding: var(--spacing-xs) var(--spacing-sm); /* Adjust padding for tablet screens */
    font-size: var(--font-size-sm); /* Slightly smaller font size */
  }

  @media (max-width: 480px) {
    padding: var(--spacing-xxs) var(--spacing-xs); /* Reduce padding for mobile */
    font-size: var(--font-size-xs); /* Smaller font size for mobile */
  }
`;
