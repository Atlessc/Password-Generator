# Label Component Documentation

The `Label` component is a styled primitive for form labels. It provides consistent styling with support for responsive design and global theming via CSS variables.

---

## Overview

The `Label` component provides:
1. **Dynamic Styling**: Uses global CSS variables for font size, color, and spacing.
2. **Responsive Design**: Automatically adjusts font size and margin for tablets and mobile devices.
3. **Form Compatibility**: Styled for optimal use with form inputs.

---

## Code

----code start {javascript}----
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
----code end----

---

## Props

The `Label` component does not accept custom props but can be extended with standard HTML attributes such as:
- `htmlFor`: Links the label to an input field's `id`.

---

## Styling Tokens

The `Label` component uses the following global CSS variables:

| **Variable**         | **Description**                                      |
|----------------------|------------------------------------------------------|
| `--font-size-base`   | Default font size for desktop screens.               |
| `--font-size-sm`     | Font size for tablets.                               |
| `--font-size-xs`     | Font size for mobile screens.                        |
| `--color-text`       | Text color of the label.                             |
| `--spacing-sm`       | Bottom margin for spacing on desktop.                |
| `--spacing-xs`       | Bottom margin for spacing on tablets.                |
| `--spacing-xxs`      | Bottom margin for spacing on mobile screens.         |

---

## Responsive Behavior

The `Label` component adjusts its styling for different screen sizes:

| **Breakpoint**          | **Behavior**                                         |
|-------------------------|------------------------------------------------------|
| `max-width: 768px`      | Reduces font size to `var(--font-size-sm)` and adjusts margin. |
| `max-width: 480px`      | Further reduces font size to `var(--font-size-xs)` and tightens margin spacing. |

---

## Example Usage

### Basic Label

----code start {javascript}----
import { Label } from './Label';

const Example = () => (
  <Label htmlFor="exampleInput">Example Label</Label>
);
----code end----

### Label with Input

----code start {javascript}----
import { Label } from './Label';
import { Input } from './Input';

const Example = () => (
  <div>
    <Label htmlFor="username">Username</Label>
    <Input id="username" placeholder="Enter your username" />
  </div>
);
----code end----

---

## Accessibility

1. **`htmlFor` Attribute**:
   - Ensures accessibility by linking the label to its corresponding input field.

2. **Readable Text**:
   - Uses high-contrast text color (`--color-text`) for better readability.

3. **Responsive Design**:
   - Maintains usability across devices by adjusting font sizes and spacing.

---

## Customization

To customize the `Label` component:
1. Modify global tokens in `GlobalStyles.js` or `theme.js`:
   - Example: Change `--font-size-sm` for tablet font size.
   - Example: Adjust `--color-text` for label text color.
2. Extend the component with additional styles if necessary.

---

## Changelog

### v1.1.0
- Integrated global CSS variables for dynamic styling.
- Enhanced responsive behavior.

### v1.0.0
- Initial release with static styles.
