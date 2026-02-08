# Image Component Documentation

The `Image` component is a styled primitive designed for rendering responsive images with dynamic properties like aspect ratio, border radius, hover effects, and transition durations. It uses global CSS variables to align with the overall design system.

---

## Overview

The `Image` component provides:
1. **Dynamic Styling**: Adjust properties like border radius, aspect ratio, and transitions via props.
2. **Responsive Design**: Adapts hover effects and scaling based on screen size.
3. **Fallback Support**: Generates a placeholder image if the `src` is not provided.

---

## Code

----code start {javascript}----
/* eslint-disable react/prop-types */
// components/ui/Image.js
import styled from 'styled-components';
import { useState, useEffect } from 'react';

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  aspect-ratio: ${({ $aspectRatioValue }) => $aspectRatioValue || 'auto'};
  border-radius: ${({ $borderRadiusValue }) => $borderRadiusValue || 'var(--radius-md)'};
  transition: transform ${({ $transitionDurationValue }) => $transitionDurationValue || 'var(--transition-medium)'} ease-in-out;

  &:hover {
    transform: ${({ $hoverEffectStatus }) => ($hoverEffectStatus ? 'scale(1.05)' : 'none')};
  }

  @media (max-width: 768px) {
    &:hover {
      transform: ${({ $hoverEffectStatus }) => ($hoverEffectStatus ? 'scale(1.03)' : 'none')};
    }
  }

  @media (max-width: 480px) {
    &:hover {
      transform: none; /* Remove hover effect on mobile for better user experience */
    }
  }
`;

const ImageContainer = styled.div`
  width: ${({ $width }) => $width || '100%'};
  max-width: 100%;
  display: block; /* Ensure the container is a block element */
`;

export const Image = ({
  src,
  width = '100%',
  height = 'auto',
  alt,
  aspectRatioValue = 'auto',
  borderRadiusValue = 'var(--radius-md)',
  hoverEffectStatus = true,
  transitionDurationValue = 'var(--transition-medium)',
  ...rest
}) => {
  const [placeholderSrc, setPlaceholderSrc] = useState('');

  useEffect(() => {
    let placeholderUrl = '';

    if (width !== '100%' && height !== 'auto') {
      placeholderUrl = `https://via.placeholder.com/${width}x${height}`;
    } else if (width !== '100%' && height === 'auto') {
      placeholderUrl = `https://via.placeholder.com/${width}`;
    } else if (width === '100%' && height !== 'auto') {
      placeholderUrl = `https://via.placeholder.com/x${height}`;
    } else {
      placeholderUrl = `https://via.placeholder.com/400x300`; // Default placeholder
    }

    setPlaceholderSrc(placeholderUrl);
  }, [width, height]);

  return (
    <ImageContainer $width={width}>
      <StyledImage
        src={src || placeholderSrc}
        alt={alt}
        $aspectRatioValue={aspectRatioValue}
        $borderRadiusValue={borderRadiusValue}
        $hoverEffectStatus={hoverEffectStatus}
        $transitionDurationValue={transitionDurationValue}
        {...rest}
        loading="lazy"
      />
    </ImageContainer>
  );
};

export default Image;
----code end----

---

## Props

| **Prop**                | **Type**    | **Default**               | **Description**                                      |
|-------------------------|-------------|---------------------------|----------------------------------------------------|
| `src`                   | `string`   | `undefined`               | The source URL for the image.                     |
| `width`                 | `string`   | `'100%'`                  | The width of the image or container.              |
| `height`                | `string`   | `'auto'`                  | The height of the image or container.             |
| `alt`                   | `string`   | `undefined`               | The alt text for the image.                       |
| `aspectRatioValue`      | `string`   | `'auto'`                  | Aspect ratio for the image.                       |
| `borderRadiusValue`     | `string`   | `'var(--radius-md)'`      | Border radius for the image.                      |
| `hoverEffectStatus`     | `boolean`  | `true`                    | Whether hover scaling is enabled.                 |
| `transitionDurationValue` | `string` | `'var(--transition-medium)'` | Duration of the hover transition.                 |

---

## Styling Tokens

The `Image` component uses the following global CSS variables:

| **Variable**            | **Description**                                      |
|-------------------------|------------------------------------------------------|
| `--radius-md`           | Border radius for the image.                         |
| `--transition-medium`   | Transition duration for hover effects.               |

---

## Responsive Behavior

| **Breakpoint**          | **Behavior**                                         |
|-------------------------|------------------------------------------------------|
| `max-width: 768px`      | Scales hover effect to `1.03` for a subtler effect.  |
| `max-width: 480px`      | Disables hover scaling for better UX on mobile.      |

---

## Example Usage

### Basic Image

----code start {javascript}----
import { Image } from './Image';

const Example = () => (
  <Image
    src="https://via.placeholder.com/400x300"
    alt="Example Image"
    borderRadiusValue="var(--radius-lg)"
    hoverEffectStatus={true}
    transitionDurationValue="0.5s"
  />
);
----code end----

---

## Accessibility

1. **Alt Text**:
   - Always provide descriptive alt text for the image to improve accessibility.
2. **Lazy Loading**:
   - Uses `loading="lazy"` to optimize performance by deferring image loading until needed.

---

## Customization

To customize the image’s styling:
1. Update global tokens in `GlobalStyles.js` or `theme.js`.
   - E.g., Change `--radius-md` to adjust the border radius globally.
2. Adjust prop values for individual instances.

---

## Changelog

### v1.1.0
- Integrated global CSS variables.
- Enhanced responsive hover effects.

### v1.0.0
- Initial release with static styles and placeholder support.
