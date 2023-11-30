import React from 'react';
import ContentsLayout from '../../layout/contentsWidthLayout';
import Image from '../../components/image/Image';
import Text from '../../components/common/Text';
import TextOnImg from './rewardComponents/TextOnImg';
import TextWithImg from './rewardComponents/TextWithImg';
import CommonButton, { ButtonType } from '../../components/common/Button';

import img01 from '../../assets/img/img_tradeinproduct01_desktop.png';
import img02 from '../../assets/img/img_tradeinproduct02_desktop.png';
import Spacer from '../../components/common/Spacer';

const RewardPage: React.FC = () => {

  const moveRewardUrl = () => {
    window.open('https://front.olivar.co.kr/qpc/apt.do###', '_blank');
  };

  return (
    <>
      <ContentsLayout $type="full">
        <TextOnImg />
      </ContentsLayout>
      <ContentsLayout $type="full" $backgroundColor="white">
        <TextWithImg>
          <Spacer height="71px" />

          <Text $fontType="Body03" color="blue">
            보상판매 지원안내
          </Text>
          <Spacer height="9px" />
          <Text $fontType="H0" color="black">
            안쓰는 Apple 제품을 전달해주세요.
          </Text>
          <Text $fontType="H0" color="black">
            보상판매를 통해 더욱 할인 된
          </Text>
          <Text $fontType="H0" color="black">
            금액을 제공해드립니다.
          </Text>
          <Image src={img01} alt="01" />
          <Spacer height="22px" />
        </TextWithImg>
      </ContentsLayout>
      <ContentsLayout $type="full" $backgroundColor="black">
        <TextWithImg>
          <Spacer height="84px" />
          <Text $fontType="H0" color="white">
            iPhone, iPad, Mac까지.
          </Text>
          <Text $fontType="H0" color="white">
            모두 보상해드립니다.
          </Text>
          <Spacer height="23px" />
          <Text $fontType="Body04" color="white">
            iPhone 10 시리즈부터, iPad Air, Mac 전제품까지 지원이 가능합니다.
          </Text>
          <Text $fontType="Body04" color="white">
            하단 버튼을 통해 보상금액을 확인하실 수 있습니다.
          </Text>
          <Spacer height="23px" />
          <CommonButton type={ButtonType.Primary} onClick={moveRewardUrl} >
            보상 확인하기
          </CommonButton>
          <Spacer height="105px" />
          <Image src={img02} alt="02" />
        </TextWithImg>
      </ContentsLayout>
    </>
  );
};

export default RewardPage;
