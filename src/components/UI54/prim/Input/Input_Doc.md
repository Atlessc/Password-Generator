# Input Component Documentation

The `Input` component is a styled primitive designed for text input fields. It supports responsive design, theming, and consistent styling by utilizing global CSS variables.

---

## Overview

The `Input` component provides:
1. **Dynamic Styling**: Styled with global CSS variables for colors, spacing, and border radius.
2. **Responsive Design**: Adjusts padding and font size based on screen size.
3. **Custom Placeholder Styling**: Allows control over placeholder text color.

---

## Code

----code start {javascript}----
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
----code end----

---

## Props

| **Prop**        | **Type** | **Default** | **Description**                                   |
|------------------|----------|-------------|-------------------------------------------------|
| `placeholder`    | `string` | `undefined` | Placeholder text for the input field.           |
| `value`          | `string` | `undefined` | Value of the input field.                       |
| `onChange`       | `func`   | `undefined` | Callback for input change events.               |
| `type`           | `string` | `'text'`    | Type of input field (e.g., `text`, `password`). |
| `disabled`       | `bool`   | `false`     | Disables the input field when `true`.           |

---

## Styling Tokens

The `Input` component relies on the following global CSS variables for its design:

| **Variable**         | **Description**                                      |
|----------------------|------------------------------------------------------|
| `--color-secondary`  | Background color of the input field.                 |
| `--color-border`     | Border color of the input field.                     |
| `--color-text`       | Text color inside the input field.                   |
| `--color-placeholder`| Color for placeholder text.                          |
| `--border-width`     | Thickness of the input's border.                     |
| `--radius-md`        | Border radius for rounded corners.                   |
| `--spacing-sm`       | Padding and margin for standard input.               |
| `--spacing-xs`       | Padding for smaller screens.                         |
| `--spacing-xxs`      | Smallest padding for mobile screens.                 |
| `--font-sans`        | Font family for the input text.                      |
| `--font-size-base`   | Font size for desktop screens.                       |
| `--font-size-sm`     | Font size for tablets.                               |
| `--font-size-xs`     | Font size for mobile devices.                        |

---

## Responsive Behavior

The `Input` component adjusts for various screen sizes:

| **Breakpoint**          | **Behavior**                                         |
|-------------------------|------------------------------------------------------|
| `max-width: 768px`      | Reduces padding and font size for tablets.           |
| `max-width: 480px`      | Further reduces padding and font size for mobiles.   |

---

## Example Usage

### Basic Input Field
----code start {javascript}----
import { Input } from './Input';

const Example = () => (
  <Input placeholder="Enter your text here" />
);
----code end----

### Password Field
----code start {javascript}----
<Input type="password" placeholder="Enter your password" />
----code end----

### Disabled Input
----code start {javascript}----
<Input placeholder="Disabled field" disabled />
----code end----

---

## Accessibility

1. **Keyboard Accessibility**:
   - Fully navigable via keyboard.
   - Supports focus styles (customizable via global tokens).

2. **Placeholder Support**:
   - Provides a customizable placeholder for hints or guidance.

3. **Responsive Design**:
   - Adapts to various screen sizes for usability.

---

## Customization

To customize the `Input` component:
1. Update global tokens in `GlobalStyles.js` or `theme.js`.
   - Example: Change `--radius-md` for sharp or fully rounded corners.
   - Example: Modify `--color-placeholder` to adjust placeholder text color.
2. Pass additional props like `type`, `value`, and `onChange` to control behavior.

---

## Changelog

### v1.1.0
- Integrated global CSS variables for dynamic styling.
- Enhanced responsive design with variable-based breakpoints.

### v1.0.0
- Initial release with static styles.
