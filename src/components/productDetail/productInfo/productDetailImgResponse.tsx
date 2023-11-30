import { useState } from 'react';
import styled, { css } from 'styled-components';
import RightBtn from '../../../assets/Icons/RightBtn.svg';
import LeftBtn from '../../../assets/Icons/LeftBtn.svg';

interface DeviceTypeProps {
  isMobile?: boolean;
  isTablet?: boolean;
  productData?: any;
}

const DetailMainImgResponse: React.FC<DeviceTypeProps> = ({ isMobile, isTablet, productData }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    console.log(productData);
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
    <ImgContainer isMobile={isMobile} isTablet={isTablet}>
      <PrevBtn onClick={handlePrevImage} />
      <ImgPreview imgUrl={productData.result.thumbnails[currentImageIndex]} />
      <NextBtn onClick={handleNextImage} />
    </ImgContainer>
  );
};
const ImgContainer = styled.div<DeviceTypeProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.isMobile ? '320px' : '599px')};
  height: ${(props) => (props.isMobile ? '320px' : '599px')};
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

export default DetailMainImgResponse;
