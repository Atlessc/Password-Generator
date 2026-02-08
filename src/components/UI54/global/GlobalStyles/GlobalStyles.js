import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --color-primary: ${({ theme }) => theme.primaryColor};
    --color-secondary: ${({ theme }) => theme.secondaryColor};
    --color-background: ${({ theme }) => theme.backgroundColor};
    --color-text: ${({ theme }) => theme.textColor};
    --color-border: ${({ theme }) => theme.borderColor};
    --color-hover: ${({ theme }) => theme.hoverColor};

    --font-sans: ${({ theme }) => theme.fontSans};
    --font-mono: ${({ theme }) => theme.fontMono};

    --radius-none: ${({ theme }) => theme.radiusNone};
    --radius-sm: ${({ theme }) => theme.radiusSm};
    --radius-md: ${({ theme }) => theme.radiusMd};
    --radius-lg: ${({ theme }) => theme.radiusLg};
    --radius-full: ${({ theme }) => theme.radiusFull};

    --transition-fast: ${({ theme }) => theme.transitionFast};
    --transition-medium: ${({ theme }) => theme.transitionMedium};
    --transition-slow: ${({ theme }) => theme.transitionSlow};
  }

  body {
    background-color: var(--color-background);
    color: var(--color-text);
    font-family: var(--font-sans);
    margin: 0;
    padding: 0;
    line-height: 1.6;
    transition: background-color var(--transition-medium), color var(--transition-medium);
  }
`;

export default GlobalStyles;
