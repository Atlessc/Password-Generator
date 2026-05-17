# CheckoutForm Component Documentation

The `CheckoutForm` component provides a styled checkout form for collecting user information and triggering a submission action. It is fully customizable and supports validation and loading states.

---

## Installation

Ensure you have the following dependencies installed:

----code start {bash}----
npm install styled-components prop-types
----code end----

Include the `Input`, `Button`, and `H3` components in your project for consistent styling.

---

## Component Structure

The `CheckoutForm` component consists of:
1. **Inputs**: Styled input fields for collecting user information (name, email, address, city, and ZIP code).
2. **Button**: A styled button for form submission.
3. **FormContainer**: A styled form container for layout and styling.
4. **Labels**: Styled labels for input fields.

---

## Props

| **Prop**    | **Type**      | **Required** | **Description**                                     |
|-------------|---------------|--------------|-----------------------------------------------------|
| `onSubmit`  | `function`    | Yes          | Callback function triggered on form submission.     |
| `loading`   | `boolean`     | Yes          | Indicates whether the form is in a loading state.   |

---

## Component Logic

### State Management

The `formData` state manages the values of the input fields. It is updated via the `handleChange` function, which listens to the `onChange` event.

#### Initial State:
----code start {jsx}----
const [formData, setFormData] = useState({
  name: '',
  email: '',
  address: '',
  city: '',
  zip: '',
});
----code end----

---

### Event Handlers

#### `handleChange`

Updates the `formData` state when an input field changes.

----code start {jsx}----
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};
----code end----

#### `handleSubmit`

Prevents the default form submission behavior and triggers the `onSubmit` callback with the `formData`.

----code start {jsx}----
const handleSubmit = (e) => {
  e.preventDefault();
  onSubmit(formData);
};
----code end----

---

## Styling

### FormContainer

The `FormContainer` is a styled `<form>` element for organizing the form layout.

| **CSS Property**       | **Value**         |
|-------------------------|-------------------|
| `display`              | `flex`           |
| `flex-direction`       | `column`         |
| `gap`                  | `1rem`           |

---

### FormField

The `FormField` is a styled container for individual input fields and their labels.

| **CSS Property**       | **Value**         |
|-------------------------|-------------------|
| `display`              | `flex`           |
| `flex-direction`       | `column`         |

---

### Label

The `Label` is a styled `<label>` element for form inputs.

| **CSS Property**       | **Value**         |
|-------------------------|-------------------|
| `margin-bottom`        | `0.5rem`         |
| `color`                | `#ffffff`        |

---

## Example Usage

Here’s an example of how to integrate the `CheckoutForm` component:

----code start {jsx}----
import React from 'react';
import CheckoutForm from './components/CheckoutForm';

const App = () => {
  const handleSubmit = (data) => {
    console.log('Submitted Data:', data);
  };

  return <CheckoutForm onSubmit={handleSubmit} loading={false} />;
};

export default App;
----code end----

---

## Accessibility

1. **Keyboard Navigation**:
   - The `Input` and `Button` components are fully accessible via the keyboard.
   - `required` attributes ensure that the form fields are validated before submission.

2. **Disabled State**:
   - The `Button` is disabled while `loading` is `true`, preventing duplicate submissions.

---

## Validation

Each input field uses the `required` attribute to enforce validation. The email input has an additional `type="email"` for basic email validation.

---

## Loading State

The `Button` displays a loading message (`Processing...`) and becomes disabled when the `loading` prop is `true`.

---

## Changelog

### v1.0.0
- Initial release with:
  - Fully styled form layout.
  - State management for input fields.
  - Validation using `required` attributes.
  - Support for loading states during submission.
  - Flexible `onSubmit` callback for custom integrations.
