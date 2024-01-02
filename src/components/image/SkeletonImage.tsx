import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const loading = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const spinnerAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 16px solid #f3f3f3;
  border-top: 16px solid #7f7f7f;
  border-radius: 50%;
  width: 50px; // Adjust size as needed
  height: 50px; // Adjust size as needed
   /* skeleton effect */
   animation-name:${spinnerAnimation};
   animation-duration:2s; 
   animation-iteration-count:infinite;
   animation-timing-function:linear;

   position:absolute; // added to center the spinner
   top:50%; // added to center the spinner
   left:50%; // added to center the spinner
   transform: translate(-50%, -50%); // added to center the spinner
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%; // assuming an aspect ratio of '16 : 9'
`;

const StyledImage = styled.img<{ isLoaded: boolean }>`
    position:absolute; // added
    top:0; // added
    left:0; // added
    width:100%;
    height:auto;
    display:block;
    opacity:${(props) => (props.isLoaded ? '1' : '0')};
    transition:.5s opacity linear;
`;

const SkeletonDiv = styled.div<{ show: boolean }>`
   position:absolute; 
   top:0; 
   left:0; 
   display:${(props) => (props.show ? 'block' : 'none')};
   height:100%;
   width:100%; 
   

`;

export const SkeletonImage = ({ src, alt }) => {

    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <ImageWrapper>
            <StyledImage src={src} alt={alt} onLoad={() => setIsLoaded(true)} isLoaded={isLoaded} />
            <SkeletonDiv show={!isLoaded} >
                <Spinner />

            </SkeletonDiv>
        </ImageWrapper>
    );
};

