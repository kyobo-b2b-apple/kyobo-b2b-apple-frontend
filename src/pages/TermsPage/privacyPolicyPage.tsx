import React from 'react';
import { Text, Spacer } from '../../components/common';
import ContentsLayout from '../../layout/contentsWidthLayout';
import { PolicyList } from '../../constants/terms';
import PolicyContainer from '../../components/terms/PolicyContainer';

const PrivacyPolicyPage = () => {
  return (
    <ContentsLayout $type="full">
      <ContentsLayout $type="responsive">
        <Spacer height="41px" />
        <Text $fontType="H2" color="white">
          개인정보 수집 및 이용동의
        </Text>
        <Spacer height="28px" />

        {PolicyList.map((item, index) => (
          <PolicyContainer key={index} title={item.title} content={item.content} />
        ))}
        <Text $fontType="Caption02" color="white" lineHeight="22px">
          ※ 동의를 거부하시는 경우에도 서비스는 이용이 가능합니다.
        </Text>
        <Spacer height="330px" />
      </ContentsLayout>
    </ContentsLayout>
  );
};
export default PrivacyPolicyPage;
