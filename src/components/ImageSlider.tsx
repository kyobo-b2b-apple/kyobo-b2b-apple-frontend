import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import ContentsLayout from '../layout/contentsWidthLayout';

import banner from '../assets/img/banner.png';
import left from '../assets/img/ic_photoleft_desktop.png';
import right from '../assets/img/ic_photoright_desktop.png';



const ImageSlider = ({ images }) => {
  const [currentslide, setCurrentSlide] = useState(0);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };
  console.log(currentslide);

  return (
    <SliderWapper>
      <SliderContainer>
        {images.map((img, idx) => (
          <Img key={idx} src={img} currentslide={currentslide} idx={idx} />
        ))}
      </SliderContainer>
      <Dots>
        {images.map((_, idx) => (
          <Dot key={idx} $active={idx === currentslide} onClick={() => setCurrentSlide(idx)} />
        ))}
      </Dots>
      <LeftBtn onClick={handlePrevSlide}>
        <img src={left} />
      </LeftBtn>
      <RightBtn onClick={handleNextSlide}>
        <img src={right} />
      </RightBtn>
    </SliderWapper>
  );
};

export default ImageSlider;

const SliderWapper = styled.div`
  height: 477px;
  position: relative;
  width: 100vw;
`;

const SliderContainer = styled.div`
  height: 477px;
  display: flex;
  flex-direction: row;
  position: absolute;
  left: 0;
  top: 0;
`;

const Img = styled.img<{ idx: number; currentslide: number }>`
  object-fit: cover;
  width: 100vw;
  height: 100%;

  top: 0;
  transition: transform 0.3s;

  /* 버튼 클릭 idx가 현재 위치와 다르면 그만큼 사진 이동 */
  ${({ idx, currentslide }) => {
    const offset = idx - currentslide;
    return css`
      transform: translateX(${offset * 100}vw);
    `;
  }}
`;

const Dots = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: transparent;

  padding: 5px;
`;

const Dot = styled.button<{ $active: boolean }>`
  z-index: 999;
  background-color: grey;
  border: none;
  width: 15px;
  height: 15px;
  cursor: pointer;
  margin: 0 5px;
  border-radius: 100%;

  ${({ $active }) =>
    $active &&
    css`
      background-color: ${props => props.theme.color.grey80};
    `}
`;

const LeftBtn = styled.button`
  position: absolute;
  left: 20%;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  z-index: 99;
`;

const RightBtn = styled.button`
  position: absolute;
  right: 20%;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  z-index: 99;
`;