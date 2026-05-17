import styled from 'styled-components';

export const Card = styled.div`
  background-color: var(--color-secondary);
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius-md);
  max-width: 400px;
  padding: var(--spacing-lg);
  margin: var(--spacing-sm) 0;
  color: var(--color-text);
  transition: transform var(--transition-medium);

  &:hover {
    transform: scale(1.02); /* Subtle hover effect */
  }

  @media (max-width: 768px) {
    max-width: 100%; /* On tablets, the card will take full width of the container */
    padding: var(--spacing-md);
  }

  @media (max-width: 480px) {
    padding: var(--spacing-sm); /* On mobile devices, reduce padding for a compact design */
    margin: var(--spacing-sm); /* Increase margin to give space between cards */
  }
`;

export const CardHeader = styled.div`
  margin-bottom: var(--spacing-md);
`;

export const CardTitle = styled.h3`
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-primary);

  @media (max-width: 768px) {
    font-size: var(--font-size-md); /* Adjust font size on smaller screens */
  }

  @media (max-width: 480px) {
    font-size: var(--font-size-sm); /* Further reduction on mobile */
  }
`;

export const CardContent = styled.div`
  font-size: var(--font-size-base);
  color: var(--color-text);

  @media (max-width: 768px) {
    font-size: var(--font-size-sm);
  }

  @media (max-width: 480px) {
    font-size: var(--font-size-xs);
  }
`;

export const CardFooter = styled.div`
  margin-top: var(--spacing-md);
`;
