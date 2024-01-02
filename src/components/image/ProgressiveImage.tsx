import React, { useState } from 'react';
import styled from 'styled-components';


const ProgressiveImage = ({ lowQualitySrc, highQualitySrc, alt }) => {
    const [src, setSrc] = useState(lowQualitySrc);
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <ImageWrapper
            src={src}
            alt={alt}
            isLoaded={isLoaded}
            onLoad={() => {
                setSrc(highQualitySrc);
                setIsLoaded(true);
            }}
        />
    );
};

export default ProgressiveImage;

const ImageWrapper = styled.img<{ isLoaded: boolean }>`
  transition: 0.5s filter linear;
  width: 100%;
  filter: ${(props) => (props.isLoaded ? 'none' : 'blur(20px)')};
`;
