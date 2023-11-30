import React from 'react';
import { Spacer, Text } from '../../components/common';
import ContentsLayout from '../../layout/contentsWidthLayout';
import { TermsList } from '../../constants/terms';
import TermsContainer from '../../components/terms/TermsContainer';

const TermsPage = () => {
  return (
    <ContentsLayout $type="full">
      <ContentsLayout $type="responsive">
        <Spacer height="41px" />
        <Text $fontType="H2" color="white">
          이용약관
        </Text>
        <Spacer height="28px" />
        {TermsList.map((item, index) => (
          <TermsContainer key={index} title={item.title} content={item.content} />
        ))}
        <Spacer height="147px" />
      </ContentsLayout>
    </ContentsLayout>
  );
};
export default TermsPage;
