import React, { createContext, useContext, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { H3, Text } from '../StyledComponents';

const ToastContext = createContext();

export const useToast = () => {
  return useContext(ToastContext);
};

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
          <Toast key={toast.id}>
            <H3>{toast.title}</H3>
            <Text>{toast.description}</Text>
          </Toast>
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
};

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

const ToastContainer = styled.div`
  position: fixed;
  bottom: var(--spacing-lg);
  right: var(--spacing-lg);
  z-index: 99;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
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
