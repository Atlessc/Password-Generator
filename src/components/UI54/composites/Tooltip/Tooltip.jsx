import React, { useState } from 'react';
import styled from 'styled-components';

const TooltipWrapper = styled.div`
  display: inline-block;
  position: relative;
`;

const TooltipBox = styled.div`
  position: absolute;
  background-color: ${({ backgroundColor }) => backgroundColor || 'var(--color-tooltip-bg)'};
  color: var(--color-tooltip-text);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  white-space: nowrap;
  z-index: 1000;
  opacity: ${({ opacity }) => opacity || 0.9};
  transition: opacity var(--transition-fast), transform var(--transition-fast);
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  transform: ${({ isVisible, position }) =>
    isVisible
      ? 'translate(0, 0)'
      : position === 'top'
      ? 'translate(0, -10px)'
      : position === 'bottom'
      ? 'translate(0, 10px)'
      : position === 'left'
      ? 'translate(-10px, 0)'
      : 'translate(10px, 0)'};

  ${({ position }) =>
    position === 'top' &&
    `
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: var(--spacing-xxs);
  `}
  ${({ position }) =>
    position === 'bottom' &&
    `
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: var(--spacing-xxs);
  `}
  ${({ position }) =>
    position === 'left' &&
    `
    right: 100%;
    top: 50%;
    transform: translateY(-50%);
    margin-right: var(--spacing-xxs);
  `}
  ${({ position }) =>
    position === 'right' &&
    `
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    margin-left: var(--spacing-xxs);
  `}
`;

const TooltipArrow = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;

  ${({ position, arrowSize, arrowColor }) =>
    position === 'top' &&
    `
    bottom: -${arrowSize}px;
    left: 50%;
    transform: translateX(-50%);
    border-width: ${arrowSize}px ${arrowSize}px 0 ${arrowSize}px;
    border-color: ${arrowColor || 'var(--color-tooltip-bg)'} transparent transparent transparent;
  `}
  ${({ position, arrowSize, arrowColor }) =>
    position === 'bottom' &&
    `
    top: -${arrowSize}px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 0 ${arrowSize}px ${arrowSize}px ${arrowSize}px;
    border-color: transparent transparent ${arrowColor || 'var(--color-tooltip-bg)'} transparent;
  `}
  ${({ position, arrowSize, arrowColor }) =>
    position === 'left' &&
    `
    top: 50%;
    right: -${arrowSize}px;
    transform: translateY(-50%);
    border-width: ${arrowSize}px 0 ${arrowSize}px ${arrowSize}px;
    border-color: transparent transparent transparent ${arrowColor || 'var(--color-tooltip-bg)'};
  `}
  ${({ position, arrowSize, arrowColor }) =>
    position === 'right' &&
    `
    top: 50%;
    left: -${arrowSize}px;
    transform: translateY(-50%);
    border-width: ${arrowSize}px ${arrowSize}px ${arrowSize}px 0;
    border-color: transparent ${arrowColor || 'var(--color-tooltip-bg)'} transparent transparent;
  `}
`;

const Tooltip = ({
  children,
  text,
  position = 'top',
  backgroundColor,
  opacity,
  trigger = 'hover',
  delay = 0,
  allowEnter = true,
  arrow = true,
  arrowSize = 5,
  arrowColor,
  float = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState({});

  let timeout;

  const handleShowTooltip = (event) => {
    if (float) {
      const { clientX, clientY } = event;
      setTooltipStyle({ top: clientY, left: clientX });
    }
    clearTimeout(timeout);
    timeout = setTimeout(() => setIsVisible(true), delay);
  };

  const handleHideTooltip = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => setIsVisible(false), delay);
  };

  const handleMouseMove = (event) => {
    if (float) {
      const { clientX, clientY } = event;
      setTooltipStyle({ top: clientY, left: clientX });
    }
  };

  return (
    <TooltipWrapper
      onMouseEnter={trigger === 'hover' ? handleShowTooltip : undefined}
      onMouseLeave={trigger === 'hover' ? handleHideTooltip : undefined}
      onClick={trigger === 'click' ? () => setIsVisible((prev) => !prev) : undefined}
      onMouseMove={float ? handleMouseMove : undefined}
    >
      {children}
      <TooltipBox
        isVisible={isVisible}
        position={position}
        backgroundColor={backgroundColor}
        opacity={opacity}
        onMouseEnter={allowEnter ? handleShowTooltip : undefined}
        onMouseLeave={allowEnter ? handleHideTooltip : undefined}
        style={float ? tooltipStyle : {}}
      >
        {text}
        {arrow && <TooltipArrow position={position} arrowSize={arrowSize} arrowColor={arrowColor} />}
      </TooltipBox>
    </TooltipWrapper>
  );
};

export default Tooltip;
