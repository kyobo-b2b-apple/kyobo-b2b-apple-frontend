import React from 'react';
import Spacer from '../../components/common/Spacer';
import Text from '../../components/common/Text';
import ContentsLayout from '../../layout/contentsWidthLayout';

const InfoHandlingPage = () => {
  return (
    <ContentsLayout $type="full">
      <ContentsLayout $type="responsive">
        <Spacer height="41px" />
        <Text $fontType="H2" color="white">
          개인정보 취급위탁 동의
        </Text>
        <Spacer height="28px" />

        <Text $fontType="Caption03" color="white" lineHeight="22px">
          아래 내용의 동의 여부는 회원가입에 영향을 미치지 않습니다. 단, 동의 거부시 서비스 이용에 제한이 있을 수
          있습니다.
        </Text>
        <Spacer height="20px" />

        <Text $fontType="Caption02" color="white" lineHeight="22px">
          회사는 서비스 이행을 위해 아래와 같이 외부 전문업체에 위탁하여 운영하고 있습니다.
          <br /> o 위탁 대상자 : 로젠택배
          <br /> o 위탁업무 내용 : 배송 업무
          <br /> o 위탁 대상자 : 카페24
          <br /> o 위탁업무 내용 : 카카오톡 메시지 발송 업무
          <br /> o 위탁 대상자 : 한국정보통신(주)
          <br /> o 위탁업무 내용 : 결제PG
        </Text>
        <Spacer height="355px" />
      </ContentsLayout>
    </ContentsLayout>
  );
};
export default InfoHandlingPage;
