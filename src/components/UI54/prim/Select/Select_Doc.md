# Select Component Documentation

The `Select` component is a styled primitive for dropdown functionality. It is built to support global theming, responsive design, and dynamic interaction.

---

## Overview

The `Select` component consists of the following parts:
1. **`Select`**: The main wrapper that manages the dropdown state.
2. **`SelectTrigger`**: The clickable area to open/close the dropdown.
3. **`SelectContent`**: The dropdown container that holds selectable items.
4. **`SelectItem`**: Individual selectable items within the dropdown.

---

## Code

### Main Component

----code start {javascript}----
import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export const Select = ({ children }) => {
  const [isopen, setisopen] = useState(false);
  const toggleDropdown = () => setisopen(!isopen);

  const triggerElement = children.find(child => child.type === SelectTrigger);
  const contentElement = children.find(child => child.type === SelectContent);

  return (
    <SelectContainer>
      {React.cloneElement(triggerElement, { onClick: toggleDropdown, isopen })}
      {isopen && React.cloneElement(contentElement, { closeDropdown: () => setisopen(false) })}
    </SelectContainer>
  );
};
----code end----

### Trigger Component

----code start {javascript}----
export const SelectTrigger = ({ children, onClick, isopen }) => (
  <TriggerContainer onClick={onClick}>
    <span>{children}</span>
    <ChevronIcon $isopen>
      <FontAwesomeIcon icon={faChevronDown} />
    </ChevronIcon>
  </TriggerContainer>
);
----code end----

### Content Component

----code start {javascript}----
export const SelectContent = ({ children, closeDropdown }) => (
  <ContentContainer>
    {React.Children.map(children, (child) =>
      React.cloneElement(child, { closeDropdown })
    )}
  </ContentContainer>
);
----code end----

### Item Component

----code start {javascript}----
export const SelectItem = ({ children, onClick, closeDropdown }) => (
  <ItemContainer
    onClick={() => {
      onClick();
      closeDropdown();
    }}
  >
    {children}
  </ItemContainer>
);
----code end----

---

## Styling Tokens

The `Select` component uses the following global CSS variables:

| **Variable**         | **Description**                                      |
|----------------------|------------------------------------------------------|
| `--color-secondary`  | Background color of the dropdown and trigger.        |
| `--color-border`     | Border color of the dropdown and trigger.            |
| `--color-text`       | Text color for the trigger and items.                |
| `--color-muted`      | Muted text color for dropdown items.                 |
| `--color-hover`      | Background color for hover states.                   |
| `--border-width`     | Thickness of the dropdown and trigger border.        |
| `--radius-md`        | Border radius for rounded corners.                   |
| `--spacing-sm`       | Padding for compact areas.                           |
| `--spacing-md`       | Padding for larger areas.                            |
| `--spacing-xs`       | Spacing between dropdown and trigger.                |
| `--transition-medium`| Transition duration for hover and dropdown toggle.   |

---

## Props

### `Select`

| **Prop**        | **Type**   | **Default** | **Description**                            |
|------------------|------------|-------------|--------------------------------------------|
| `children`       | `ReactNode` | `undefined` | Must include `SelectTrigger` and `SelectContent`. |

### `SelectTrigger`

| **Prop**        | **Type**   | **Default** | **Description**                            |
|------------------|------------|-------------|--------------------------------------------|
| `children`       | `ReactNode` | `undefined` | The clickable content inside the trigger.  |
| `onClick`        | `func`     | `undefined` | Callback when the trigger is clicked.      |
| `isopen`         | `boolean`  | `false`     | State indicating if the dropdown is open.  |

### `SelectContent`

| **Prop**        | **Type**   | **Default** | **Description**                            |
|------------------|------------|-------------|--------------------------------------------|
| `children`       | `ReactNode` | `undefined` | Items to display in the dropdown.          |
| `closeDropdown`  | `func`     | `undefined` | Callback to close the dropdown.            |

### `SelectItem`

| **Prop**        | **Type**   | **Default** | **Description**                            |
|------------------|------------|-------------|--------------------------------------------|
| `children`       | `ReactNode` | `undefined` | Content of the dropdown item.              |
| `onClick`        | `func`     | `undefined` | Callback when the item is clicked.         |
| `closeDropdown`  | `func`     | `undefined` | Callback to close the dropdown.            |

---

## Responsive Behavior

The `Select` component is responsive by default:
- Dropdown width is controlled by the parent container.
- Hover effects and scaling transitions are optimized for touch devices.

---

## Example Usage

### Basic Select Component

----code start {javascript}----
import { Select, SelectTrigger, SelectContent, SelectItem } from './Select';

const Example = () => (
  <Select>
    <SelectTrigger>Select an option</SelectTrigger>
    <SelectContent>
      <SelectItem onClick={() => console.log('Option 1')}>Option 1</SelectItem>
      <SelectItem onClick={() => console.log('Option 2')}>Option 2</SelectItem>
      <SelectItem onClick={() => console.log('Option 3')}>Option 3</SelectItem>
    </SelectContent>
  </Select>
);
----code end----

---

## Accessibility

1. **Keyboard Accessibility**:
   - Ensure `Tab` navigation works for `SelectTrigger` and `SelectItem`.

2. **Screen Readers**:
   - Use `aria-expanded` on the trigger and `aria-hidden` on the dropdown for accessibility.

3. **Responsive Design**:
   - Dropdown adapts to the container’s width for usability on all devices.

---

## Customization

To customize the `Select` component:
1. Modify global tokens in `GlobalStyles.js` or `theme.js`:
   - Example: Adjust `--radius-md` for dropdown corners.
   - Example: Change `--color-hover` for hover states.
2. Extend styles with additional custom components if needed.

---

## Changelog

### v1.1.0
- Integrated global CSS variables for dynamic styling.
- Improved hover effects and responsive design.

### v1.0.0
- Initial release with static styles.
