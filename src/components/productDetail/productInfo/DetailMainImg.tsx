import { useState } from 'react';
import styled, { css } from 'styled-components';
import RightBtn from '../../../assets/Icons/RightBtn.svg';
import LeftBtn from '../../../assets/Icons/LeftBtn.svg';

const DetailMainImg = ({ productData }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    if (currentImageIndex < productData.result.thumbnails.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      setCurrentImageIndex(0);
    }
  };

  const handlePrevImage = () => {
    console.log(productData);
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    } else {
      setCurrentImageIndex(productData.result.thumbnails.length - 1);
    }
  };
  return (
    <ImgContainer>
      <PrevBtn onClick={handlePrevImage} />
      <ImgPreview imgUrl={productData.result.thumbnails[currentImageIndex]} />
      <NextBtn onClick={handleNextImage} />
    </ImgContainer>
  );
};
const ImgContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 351px;
  height: 351px;
  background-color: #fff;
  border-radius: 8px;
`;
const ImgPreview = styled.div<{ imgUrl: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.imgUrl});
  background-repeat: no-repeat;
  background-size: contain;
`;
const Btn = css`
  position: absolute;
  width: 25px;
  height: 25px;
`;
const NextBtn = styled.button`
  ${Btn}
  background-image: url(${RightBtn});
  right: 10px;
`;
const PrevBtn = styled.button`
  ${Btn}
  background-image: url(${LeftBtn});
  left: 10px;
`;

export default DetailMainImg;
