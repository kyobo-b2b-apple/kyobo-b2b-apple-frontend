import React from 'react';
import styled from 'styled-components';
import dessert from '../../../assets/img/img_bannertradein_desktop.png';

import Text from '../../../components/common/Text';
import Spacer from '../../../components/common/Spacer';

const TextonImg = () => {
  return (
    <ImageWithTextContainer>
      <TextContainer>
        <Text $fontType="Body04" color="white">
          Trade In
        </Text>
        <Spacer height="9px" />
        <Text $fontType="H0" color="white">
          보상판매를 통해 Apple 제품을
        </Text>
        <Text $fontType="H0" color="white">
          조금더 할인된 금액으로 만나보세요.
        </Text>
      </TextContainer>
    </ImageWithTextContainer>
  );
};

export default TextonImg;

const ImageWithTextContainer = styled.div`
  width: 100%;
  height: 323px;
  background-image: url(${dessert});
  background-repeat: no-repeat;
  background-size: cover;

  display: grid;
  place-items: center;
`;

const TextContainer = styled.div`
  width: 341px;
  height: 99px;
  /* margin: 0 auto; */
  text-align: center;
`;
