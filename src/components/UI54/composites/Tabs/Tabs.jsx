/* eslint-disable react/prop-types */
import styled from 'styled-components';
import React, { useState, useEffect, memo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const Tabs = ({ defaultValue, children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Parse the tab from the query parameters, or use the defaultValue
  const getTabFromUrl = () => {
    const urlSearchParams = new URLSearchParams(location.search);
    return urlSearchParams.get('tab') || defaultValue;
  };

  const [activeTab, setActiveTab] = useState(getTabFromUrl);

  // Sync activeTab with the URL params on initial load and when URL changes
  useEffect(() => {
    const tabFromUrl = getTabFromUrl();
    if (tabFromUrl !== activeTab) {
      setActiveTab(tabFromUrl);
    }
  }, [location.search]);

  // Update the URL whenever the activeTab changes
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    if (urlSearchParams.get('tab') !== activeTab) {
      urlSearchParams.set('tab', activeTab);
      navigate(`?${urlSearchParams.toString()}`, { replace: true });
    }
  }, [activeTab, navigate]);

  return (
    <div>
      {React.Children.map(children, (child) => {
        if (child.type.displayName === 'TabsList') {
          return React.cloneElement(child, { activeTab, setActiveTab });
        }
        return React.cloneElement(child, { activeTab });
      })}
    </div>
  );
};

// Memoized TabsList to prevent re-renders if activeTab or setActiveTab haven't changed
export const TabsList = memo(({ activeTab, setActiveTab, children }) => (
  <ResponsiveTabsList>
    {React.Children.map(children, (child, index) =>
      React.cloneElement(child, {
        key: `tab-trigger-${index}`,
        isActive: activeTab === child.props.value,
        onClick: () => setActiveTab(child.props.value),
      })
    )}
  </ResponsiveTabsList>
));

TabsList.displayName = 'TabsList';

// Memoized TabsTrigger to prevent re-renders if isActive or onClick haven't changed
export const TabsTrigger = memo(({ isActive, onClick, children }) => (
  <StyledTabButton onClick={onClick} $isActive={isActive}>
    {children}
  </StyledTabButton>
));

// Memoized TabsContent to prevent re-renders if activeTab or value haven't changed
export const TabsContent = memo(({ value, activeTab, children }) => {
  return activeTab === value ? <div>{children}</div> : null;
});

// Styled Components for responsiveness

const ResponsiveTabsList = styled.div`
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  flex-wrap: wrap;

  @media (max-width: 768px) {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    padding-bottom: var(--spacing-xs);
  }
`;

const StyledTabButton = styled.button`
  padding: var(--spacing-xs) var(--spacing-md);
  background-color: ${({ $isActive }) => ($isActive ? 'var(--color-primary)' : 'transparent')};
  color: ${({ $isActive }) => ($isActive ? 'var(--color-secondary)' : 'var(--color-primary)')};
  border: var(--border-width) solid var(--color-primary);
  border-radius: var(--radius-md);
  cursor: pointer;
  white-space: nowrap;
  font-size: var(--font-size-sm);
  transition: background-color var(--transition-medium);

  &:hover {
    background-color: ${({ $isActive }) => ($isActive ? 'var(--color-hover)' : 'var(--color-muted)')};
    color: var(--color-text);
  }

  @media (max-width: 768px) {
    flex: auto;
    font-size: var(--font-size-xs);
  }
`;
