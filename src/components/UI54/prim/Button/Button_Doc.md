# Button Component Documentation

The `Button` component is a styled primitive designed to work seamlessly with global design tokens and theming. It supports dynamic styles based on variants and aligns with the global CSS variables for consistency.

---

## Overview

The `Button` component provides:
1. Dynamic styles for different `variant` types (e.g., `outline`).
2. Integration with global tokens for colors, spacing, border radii, and typography.
3. Accessibility support with hover and disabled states.

---

## Code

----code start {javascript}----
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
----code end----

---

## Props

### `variant`
| **Type**     | **Default** | **Description**                                      |
|--------------|-------------|------------------------------------------------------|
| `string`     | `default`   | Defines the button style: `outline` or `default`.    |

---

## Styling Tokens

The `Button` component relies on the following global CSS variables:

| **Variable**          | **Description**                                      |
|-----------------------|------------------------------------------------------|
| `--color-primary`     | Primary button background color.                     |
| `--color-text`        | Text color for the button.                           |
| `--color-border`      | Border color of the button.                          |
| `--color-hover`       | Background color on hover.                           |
| `--color-secondary`   | Color used for disabled buttons.                     |
| `--font-sans`         | Font family for button text.                         |
| `--font-size-base`    | Font size for button text.                           |
| `--border-width`      | Thickness of the button border.                      |
| `--radius-md`         | Border radius for rounded corners.                   |
| `--spacing-sm`        | Small spacing token, used for vertical padding.      |
| `--spacing-md`        | Medium spacing token, used for horizontal padding.   |
| `--transition-medium` | Transition speed for hover and focus effects.        |

---

## States

### Default
The button will render with the primary background color and text color:
- Background: `var(--color-primary)`
- Text: `var(--color-text)`

### Hover
On hover, the button adjusts its background and text colors:
- Background: `var(--color-hover)`
- Text: `var(--color-text)`

### Outline Variant
- Background: `transparent`
- Border: `var(--color-border)`
- Text: `var(--color-primary)`
- Hover Background: `var(--color-primary)`

### Disabled
The button appears grayed out with no hover effects:
- Background: `var(--color-border)`
- Text: `var(--color-secondary)`
- Cursor: `not-allowed`

---

## Example Usage

### Default Button
----code start {javascript}----
import { Button } from './Button';

const Example = () => (
  <Button>Click Me</Button>
);
----code end----

### Outline Button
----code start {javascript}----
<Button variant="outline">Outlined Button</Button>
----code end----

### Disabled Button
----code start {javascript}----
<Button disabled>Disabled Button</Button>
----code end----

---

## Accessibility

1. **Keyboard Navigation**:
   - Fully keyboard-accessible.
   - Supports focus styles (customizable with additional tokens).

2. **Disabled State**:
   - Provides visual feedback for disabled buttons.

3. **Hover Feedback**:
   - Smooth transitions for hover states.

---

## Customization

To customize the button's look and feel, adjust the global tokens defined in `GlobalStyles.js` or `theme.js`. For example:
- Change `--radius-md` for more rounded or sharp edges.
- Update `--color-primary` to match your design system.

---

## Changelog

### v1.1.0
- Integrated with global CSS variables.
- Added support for `:disabled` styles.

### v1.0.0
- Initial release with basic styling and theming support.
