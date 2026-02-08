// components/ui/Select.jsx
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

export const SelectTrigger = ({ children, onClick, isopen }) => (
  <TriggerContainer onClick={onClick}>
    <span>{children}</span>
    <ChevronIcon $isopen>
      <FontAwesomeIcon icon={faChevronDown} />
    </ChevronIcon>
  </TriggerContainer>
);

export const SelectContent = ({ children, closeDropdown }) => (
  <ContentContainer>
    {React.Children.map(children, (child) =>
      React.cloneElement(child, { closeDropdown })
    )}
  </ContentContainer>
);

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

const SelectContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 200px;
`;

const TriggerContainer = styled.div`
  background-color: var(--color-secondary);
  border: var(--border-width) solid var(--color-border);
  color: var(--color-text);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 100%;
  transition: background-color var(--transition-medium);

  &:hover {
    background-color: var(--color-hover);
  }
`;

const ChevronIcon = styled.span`
  transition: transform var(--transition-medium);
  transform: ${({ $isopen }) => ($isopen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const ContentContainer = styled.div`
  background-color: var(--color-secondary);
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius-md);
  margin-top: var(--spacing-xs);
  position: absolute;
  width: 100%;
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ItemContainer = styled.div`
  padding: var(--spacing-sm) var(--spacing-md);
  color: var(--color-muted);
  cursor: pointer;
  transition: background-color var(--transition-medium);

  &:hover {
    background-color: var(--color-hover);
  }
`;
