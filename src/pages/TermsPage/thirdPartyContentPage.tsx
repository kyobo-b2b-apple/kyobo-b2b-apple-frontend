import React from 'react';
import Spacer from '../../components/common/Spacer';
import Text from '../../components/common/Text';
import ContentsLayout from '../../layout/contentsWidthLayout';

const ThirdPartyContentPage = () => {
  return (
    <ContentsLayout $type="full">
      <ContentsLayout $type="responsive">
        <Spacer height="41px" />
        <Text $fontType="H2" color="white">
          개인정보 제3자 제공 동의
        </Text>
        <Spacer height="28px" />

        <Text $fontType="Caption03" color="white" lineHeight="22px">
          아래 내용의 동의 여부는 회원가입에 영향을 미치지 않습니다. 단, 동의 거부시 서비스 이용에 제한이 있을 수
          있습니다.
        </Text>
        <Spacer height="28px" />

        <Text $fontType="Caption02" color="white" lineHeight="22px">
          - 제공 받는 자 : 입점 판매업체
          <br />
          - 제공 항목 : 성명, 휴대폰 번호, 이메일, 배송지 주소(구매자와 수취인이 다를 경우 수취인의 정보 제공)
          <br />
          - 제공 목적 : 1. 주문한 물품의 배송/설치 등 고객과 체결한 계약의 이행 2. 민원/불만/건의사항의 상담 및 처리 3.
          서비스 주문/결제 4. 기타 구매 활동에 필요한 본인 확인에 이용
          <br />- 보유 및 이용기간 : 1년
        </Text>
        <Spacer height="386px" />
      </ContentsLayout>
    </ContentsLayout>
  );
};
export default ThirdPartyContentPage;
