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
