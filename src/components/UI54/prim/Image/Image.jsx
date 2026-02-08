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
