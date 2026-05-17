# Toast Component Documentation

The `useToast` hook and `ToastProvider` component provide a customizable notification system. Toast messages are styled consistently using global CSS variables, making them align seamlessly with your design system.

---

## Overview

The `useToast` system provides:
1. **Global Toast Management**: Add toast notifications from anywhere in your application.
2. **Customizable Styling**: Fully integrated with CSS variables for theming.
3. **Dynamic Timing**: Control how long each toast remains visible.
4. **Smooth Animations**: Built-in `slideIn` and `slideOut` animations.

---

## Code

### useToast Hook

----code start {javascript}----
import React, { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

export const useToast = () => {
  return useContext(ToastContext);
};
----code end----

### ToastProvider Component

----code start {javascript}----
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { H3, Text } from '../StyledComponents';

export const ToastProvider = ({ children, timing = 5000 }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = ({ title, description }) => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, title, description }]);

    // Remove the toast after the timing duration
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, timing);
  };

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      <ToastContainer>
        {toasts.map((toast) => (
          <Toast key={toast.id} timing={timing}>
            <H3>{toast.title}</H3>
            <Text>{toast.description}</Text>
          </Toast>
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
};
----code end----

---

## Styling Components

### ToastContainer

----code start {javascript}----
const ToastContainer = styled.div`
  position: fixed;
  bottom: var(--spacing-lg);
  right: var(--spacing-lg);
  z-index: 99;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
`;
----code end----

### Toast

----code start {javascript}----
const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(100%);
  } 
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(100%);
  }
`;

const Toast = styled.div`
  background-color: var(--color-toast-bg);
  border: var(--border-width) solid var(--color-toast-border);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  color: var(--color-toast-text);
  animation: 
    ${slideIn} var(--transition-medium) ease forwards, 
    ${slideOut} var(--transition-medium) ease-out forwards;
  animation-delay: 0s, calc(${({ timing }) => timing}ms - 0.5s);
  width: 300px;

  ${H3} {
    margin-bottom: var(--spacing-sm);
    color: var(--color-toast-title);
  }

  ${Text} {
    color: var(--color-toast-body);
  }
`;
----code end----

---

## Props

### ToastProvider

| **Prop**   | **Type** | **Default** | **Description**                              |
|------------|----------|-------------|----------------------------------------------|
| `children` | `node`   | `undefined` | The children components wrapped by the provider. |
| `timing`   | `number` | `5000`      | Duration (in ms) for how long a toast is visible. |

### addToast (from `useToast`)

| **Prop**        | **Type** | **Default**   | **Description**                          |
|------------------|----------|---------------|------------------------------------------|
| `title`         | `string` | `undefined`   | The title text of the toast notification.|
| `description`   | `string` | `undefined`   | The description text of the toast.       |

---

## Styling Tokens

The `Toast` component uses the following global CSS variables:

| **Variable**          | **Description**                                     |
|-----------------------|-----------------------------------------------------|
| `--color-toast-bg`    | Background color of the toast.                      |
| `--color-toast-border`| Border color of the toast.                          |
| `--color-toast-text`  | Text color of the toast body.                       |
| `--color-toast-title` | Text color of the toast title.                      |
| `--color-toast-body`  | Text color for the description.                     |
| `--radius-md`         | Border radius for the toast box.                    |
| `--spacing-lg`        | Spacing for the toast container position.           |
| `--spacing-md`        | Padding inside the toast.                           |
| `--spacing-sm`        | Spacing for margin between title and body.          |
| `--border-width`      | Border thickness for the toast.                     |
| `--transition-medium` | Transition duration for animations.                 |

---

## Example Usage

### Basic Toast Setup

----code start {javascript}----
import { ToastProvider, useToast } from './useToast';

const App = () => {
  const { toast } = useToast();

  const handleShowToast = () => {
    toast({
      title: 'Notification',
      description: 'This is a toast message.',
    });
  };

  return (
    <ToastProvider>
      <button onClick={handleShowToast}>Show Toast</button>
    </ToastProvider>
  );
};
----code end----

---

## Accessibility

1. **Keyboard Navigation**:
   - Toast notifications do not block user interaction and fade out automatically.
2. **Screen Readers**:
   - Ensure meaningful content for `title` and `description` for accessibility.

---

## Changelog

### v1.1.0
- Integrated global CSS variables for dynamic theming.
- Added support for dynamic animation timing.

### v1.0.0
- Initial release with basic toast functionality.
