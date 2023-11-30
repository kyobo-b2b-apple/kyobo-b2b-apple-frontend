import React from 'react';
import styled from 'styled-components';

interface ImgProps {
  width?: string;
  height?: string;
  src: string;
  alt: string;
}

const StyledImage = styled.img`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height};
  object-fit: cover;
  display: block;
`;

const Image: React.FC<ImgProps> = ({ width = '100%', height, src, alt }) => {
  return <StyledImage src={src} alt={alt} width={width} height={height} />;
};

export default Image;
