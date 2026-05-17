import styled from 'styled-components';

export const Button = styled.button`
  background-color: ${({ variant }) => 
    variant === 'outline' ? 'transparent' : 'var(--color-primary)'};
  color: ${({ variant }) => 
    variant === 'outline' ? 'var(--color-primary)' : 'var(--color-text)'};
  border: var(--border-width) solid var(--color-border);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition-medium);
  margin: var(--spacing-sm);

  &:hover {
    background-color: ${({ variant }) =>
      variant === 'outline' ? 'var(--color-primary)' : 'var(--color-hover)'};
    color: var(--color-text);
  }

  &:disabled {
    background-color: var(--color-border);
    color: var(--color-secondary);
    cursor: not-allowed;
  }
`;

