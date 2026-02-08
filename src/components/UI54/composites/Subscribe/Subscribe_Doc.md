# Subscribe Component Documentation

The `Subscribe` component is a styled form designed for newsletter subscriptions. It includes an input field and a button styled to flow seamlessly into one another. It supports global theming, responsive design, and integrates with a toast notification system for user feedback.

---

## Overview

The `Subscribe` component provides:
1. **Dynamic Styling**: Uses global CSS variables for consistent theming.
2. **Responsive Design**: Adapts padding and font size for tablets and mobile devices.
3. **Email Validation**: Validates email input before enabling the subscription button.
4. **Toast Notifications**: Displays feedback on successful subscription.

---

## Code

----code start {javascript}----
import styled from 'styled-components';
import { useState } from 'react';
import { useToast } from '../useToast/useToast';

const Input = styled.input`
  background-color: var(--color-secondary);
  border: var(--border-width) solid var(--color-border);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md) 0 0 var(--radius-md);
  color: var(--color-text);
  font-size: var(--font-size-base);
  width: 100%;
  box-sizing: border-box;

  &::placeholder {
    color: var(--color-placeholder);
  }

  @media (max-width: 768px) {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: var(--font-size-sm);
  }

  @media (max-width: 480px) {
    padding: var(--spacing-xxs) var(--spacing-xs);
    font-size: var(--font-size-xs);
  }
`;

const Button = styled.button`
  background-color: var(--color-primary);
  color: var(--color-secondary);
  border: var(--border-width) solid var(--color-border);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  font-size: var(--font-size-base);
  font-weight: 500;
  cursor: pointer;
  transition: background-color var(--transition-medium);
  
  &:hover {
    background-color: var(--color-hover);
    color: var(--color-text);
  }

  &:disabled {
    background-color: var(--color-muted);
    border-color: var(--color-muted);
    color: var(--color-placeholder);
    cursor: not-allowed;
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  justify-content: center;
  max-width: 400px;
  margin: var(--spacing-lg) auto 0;
`;

const Subscribe = () => {
  const [input, setInput] = useState('');
  const { toast } = useToast();

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
      setInput('');
      return;
    }
    setInput(email);
  };

  const handleSubscribeSubmit = () => {
    toast({
      title: 'Thank you for subscribing!',
      description: `You have successfully subscribed to our newsletter.`,
    });
  };

  return (
    <NewsletterForm>
      <Input
        type="email"
        placeholder="Email Address"
        onBlur={(e) => validateEmail(e.target.value)}
      />
      <Button disabled={!input} onClick={handleSubscribeSubmit}>
        Subscribe
      </Button>
    </NewsletterForm>
  );
};

export default Subscribe;
----code end----

---

## Props

### Input Field
The `Input` element accepts standard HTML attributes such as:
- `type`
- `placeholder`
- `onBlur`

### Button
The `Button` element accepts the following props:
- `disabled`: Boolean to control whether the button is clickable.

---

## Styling Tokens

The `Subscribe` component uses the following global CSS variables:

| **Variable**         | **Description**                                      |
|----------------------|------------------------------------------------------|
| `--color-secondary`  | Background color of the input and button.            |
| `--color-primary`    | Background color of the button.                      |
| `--color-border`     | Border color of the input and button.                |
| `--color-text`       | Text color of the input and button.                  |
| `--color-placeholder`| Color of the placeholder text in the input.          |
| `--color-hover`      | Background color of the button on hover.             |
| `--color-muted`      | Background and border color for disabled button.     |
| `--radius-md`        | Border radius for input and button corners.          |
| `--spacing-sm`       | Padding for input and button.                        |
| `--spacing-md`       | Additional padding for larger elements.              |
| `--spacing-lg`       | Margin for the form container.                       |
| `--font-size-base`   | Font size for desktop screens.                       |
| `--font-size-sm`     | Font size for tablets.                               |
| `--font-size-xs`     | Font size for mobile screens.                        |
| `--transition-medium`| Transition duration for hover effects.               |

---

## Validation Logic

### Email Validation
A regular expression is used to validate email input. The button is disabled until a valid email is entered.

----code start {javascript}----
const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};
----code end----

---

## Example Usage

### Basic Subscription Form

----code start {javascript}----
import Subscribe from './Subscribe';

const Example = () => (
  <div>
    <h2>Subscribe to our newsletter</h2>
    <Subscribe />
  </div>
);
----code end----

---

## Accessibility

1. **Keyboard Navigation**:
   - Input and button are fully accessible via keyboard.
   - Focus styles can be customized via global tokens.

2. **Screen Readers**:
   - Ensure the `placeholder` provides guidance for input fields.

3. **Responsive Design**:
   - Adapts font size and padding for better usability on all devices.

---

## Customization

To customize the `Subscribe` component:
1. Modify global tokens in `GlobalStyles.js` or `theme.js`:
   - Example: Change `--radius-md` for rounded or square corners.
   - Example: Adjust `--color-hover` for hover states.
2. Update the regex in `validateEmail` if stricter validation is needed.

---

## Changelog

### v1.1.0
- Integrated global CSS variables for dynamic styling.
- Enhanced responsive behavior.

### v1.0.0
- Initial release with static styles.
