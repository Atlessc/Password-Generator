# Card Component Documentation

The `Card` component is a styled primitive designed for displaying structured content with consistent theming. It leverages global CSS variables for colors, spacing, fonts, and transitions, ensuring alignment with the global design system.

---

## Overview

The `Card` component includes:
1. **Container** (`Card`): The outer wrapper for the card.
2. **Header** (`CardHeader`): The section for titles or introductory content.
3. **Title** (`CardTitle`): A styled heading for the card's title.
4. **Content** (`CardContent`): The main content area of the card.
5. **Footer** (`CardFooter`): An optional footer section for additional details or actions.

---

## Code

### Card Container

----code start {javascript}----
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
----code end----

### CardHeader

----code start {javascript}----
export const CardHeader = styled.div`
  margin-bottom: var(--spacing-md);
`;
----code end----

### CardTitle

----code start {javascript}----
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
----code end----

### CardContent

----code start {javascript}----
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
----code end----

### CardFooter

----code start {javascript}----
export const CardFooter = styled.div`
  margin-top: var(--spacing-md);
`;
----code end----

---

## Styling Tokens

The `Card` component uses the following global CSS variables for styling:

| **Variable**          | **Description**                                      |
|-----------------------|------------------------------------------------------|
| `--color-secondary`   | Background color of the card.                        |
| `--color-text`        | Text color inside the card.                          |
| `--color-border`      | Border color of the card.                            |
| `--border-width`      | Thickness of the card's border.                      |
| `--radius-md`         | Border radius for rounded corners.                   |
| `--spacing-lg`        | Padding for the card's content.                      |
| `--spacing-md`        | Smaller padding for responsive layouts.              |
| `--spacing-sm`        | Margins or minimal padding.                          |
| `--font-size-lg`      | Font size for the title (`CardTitle`).               |
| `--font-size-md`      | Font size for the title on smaller screens.          |
| `--font-size-base`    | Default font size for card content.                  |
| `--font-size-sm`      | Font size for card content on smaller screens.       |
| `--font-size-xs`      | Font size for card content on mobile screens.        |
| `--transition-medium` | Transition duration for hover effects.               |

---

## Responsive Behavior

The `Card` component adjusts for various screen sizes:

| **Breakpoint** | **Behavior**                                 |
|----------------|---------------------------------------------|
| `max-width: 768px` | Adjusts padding and max-width for tablets. |
| `max-width: 480px` | Reduces padding and font sizes for mobile.|

---

## Example Usage

### Basic Card

----code start {javascript}----
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './Card';

const Example = () => (
  <Card>
    <CardHeader>
      <CardTitle>Card Title</CardTitle>
    </CardHeader>
    <CardContent>
      <p>This is the main content of the card.</p>
    </CardContent>
    <CardFooter>
      <button>Action</button>
    </CardFooter>
  </Card>
);
----code end----

---

## Accessibility

1. **Keyboard Navigation**:
   - Ensure interactive elements (e.g., buttons in `CardFooter`) are keyboard-accessible.

2. **Responsive Design**:
   - Font sizes and paddings adapt to screen sizes for readability and usability.

---

## Customization

To customize the `Card`'s appearance:
1. Update global tokens in `GlobalStyles.js` or `theme.js`.
2. Change values for `--radius-md` (e.g., `0` for brutalist design or `9999px` for pill shapes).
3. Adjust `--color-secondary` for the background or `--color-border` for the border.

---

## Changelog

### v1.1.0
- Integrated global CSS variables for consistent styling.
- Added responsive design improvements.

### v1.0.0
- Initial release with static styles.
