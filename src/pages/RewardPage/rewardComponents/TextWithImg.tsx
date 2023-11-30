import React from 'react';
import styled from 'styled-components';

interface TextWithImgProps {
  children: any;
}

const TextWithImg: React.FC<TextWithImgProps> = ({ children }) => {
  return <TextWithImgCotainer>{children}</TextWithImgCotainer>;
};

export default TextWithImg;

const TextWithImgCotainer = styled.div`
  width: fit-content;
  /* max-width: 868px; */
  /* min-width: 360px; */
  
  text-align: center;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 868px) {
    font-size: 1rem;
  }

  @media (max-width: 868px) {
    font-size: 0.8rem;
  }

  @media (max-width: 360px) {
    width: 360px;
  }
`;
