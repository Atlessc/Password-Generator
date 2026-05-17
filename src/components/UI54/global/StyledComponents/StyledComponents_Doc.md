# StyledComponents Documentation

This document outlines the purpose and usage of the styled components defined in `StyledComponents.jsx`. These components provide a consistent typographic hierarchy and styling for inline code with responsive design support. The styles have been updated to use a **black primary color** and **white secondary/accent color** for better contrast.

---

## Overview

The file defines the following styled components:
1. **Headings** (`H1`, `H2`, `H3`): Pre-styled heading tags for a consistent hierarchy.
2. **Text Elements** (`BoldText`, `Text`, `SmallText`): Variants of text with different weights and font sizes.
3. **Code Inline** (`CodeInline`): Pre-styled inline code blocks for better readability.

All components are responsive and adapt their font sizes based on screen width.

---

## Updated Color Scheme

| **Element**   | **Primary Color** | **Secondary/Accent Color** |
|---------------|--------------------|----------------------------|
| Headings      | `#000000` (Black) | `#ffffff` (White)          |
| Text Elements | `#000000` (Black) | `#737373` (Muted Gray)     |
| Code Inline   | `#ffffff` (White) | `#000000` (Black Background)|

---

## Components

### 1. **Headings**

#### H1

----code start {javascript}----
export const H1 = styled.h1`
  font-size: 2.25rem;
  font-weight: 700;
  color: #000; /* Updated to black */
  margin: 1.5rem 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 1.875rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;
----code end----

#### H2

----code start {javascript}----
export const H2 = styled.h2`
  font-size: 1.875rem;
  font-weight: 600;
  color: #000; /* Updated to black */
  margin: 1rem 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
`;
----code end----

#### H3

----code start {javascript}----
export const H3 = styled.h3`
  font-size: 1.5rem;
  font-weight: 500;
  color: #000; /* Updated to black */
  margin: 1rem 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;
----code end----

---

### 2. **Text Elements**

#### BoldText

----code start {javascript}----
export const BoldText = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: #fff; /* Updated to white */
  margin: 0;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;
----code end----

#### Text

----code start {javascript}----
export const Text = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: #fff; /* Updated to white */
  margin: 0.5rem 0;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;
----code end----

#### SmallText

----code start {javascript}----
export const SmallText = styled.p`
  font-size: 0.875rem;
  font-weight: 400;
  color: #737373; /* Updated to muted gray */
  margin: 0.5rem 0;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }

  @media (max-width: 480px) {
    font-size: 0.625rem;
  }
`;
----code end----

---

### 3. **Code Inline**

#### CodeInline

----code start {javascript}----
export const CodeInline = styled.code`
  display: inline;
  background-color: #000; /* Updated to black */
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  color: #fff; /* Updated to white */
  border: 1px solid #fff; /* Updated to white */

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }

  @media (max-width: 480px) {
    font-size: 0.625rem;
  }
`;
----code end----

---

## Example Usage

### Headings

----code start {javascript}----
import { H1, H2, H3 } from './StyledComponents';

const Example = () => (
  <div>
    <H1>Main Heading</H1>
    <H2>Subheading</H2>
    <H3>Section Heading</H3>
  </div>
);
----code end----

### Text Elements

----code start {javascript}----
import { BoldText, Text, SmallText } from './StyledComponents';

const Example = () => (
  <div>
    <BoldText>This is bold text.</BoldText>
    <Text>This is regular text.</Text>
    <SmallText>This is small text.</SmallText>
  </div>
);
----code end----

### Code Inline

----code start {javascript}----
import { CodeInline } from './StyledComponents';

const Example = () => (
  <p>
    Use the command <CodeInline>npm install</CodeInline> to install dependencies.
  </p>
);
----code end----

---

## Accessibility

1. **Color Contrast**:
   - Primary (black) and secondary (white) colors ensure a high contrast for readability.
2. **Responsive Design**:
   - Font sizes adjust for smaller screens to maintain usability and aesthetics.

---

## Customization

1. Modify color values directly in the `StyledComponents.jsx` file or integrate with a theme provider for dynamic theming.
2. Adjust media query breakpoints for finer control over responsiveness.

---

## Changelog

### v1.1.0
- Updated color scheme to black (primary) and white (secondary/accent).
- Enhanced responsive styles for smaller screens.

### v1.0.0
- Initial release with static pink/gray color scheme.
