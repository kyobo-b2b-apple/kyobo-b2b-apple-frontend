import React from 'react';
import { styled } from 'styled-components';
import { Text } from './common';
import ContentsLayout from '../layout/contentsWidthLayout';
import { Link } from 'react-router-dom';

const Footer = () => {
  const infoData = [
    '상호 : 교보정보통신 (주)',
    '대표: 권창기',
    '사업자등록번호 : 209-81-01546',
    '통신판매업신고번호 : 2023-서울종로-0236',
  ];

  const additionalInfoData = [
    '메일 : apple@kico.co.kr',
    '주소 : 서울시 종로구 새문안로3길 23, 12층 및13층(내수동, 교보문고빌딩) (03174)',
    '호스팅제공 : 회사명(주)',
  ];

  return (
    <ContentsLayout $type="full">
      <ContentsLayout $type="responsive">
        <FooterContainer>
          <LinkContainer>
            <a href="http://www.kico.co.kr" target="_blank" rel="noopener noreferrer">
              <Text $fontType="Body04" color="white">
                회사소개
              </Text>
            </a>
            <Link to="/terms/index">
              <Text $fontType="Body04" color="white">
                이용약관
              </Text>
            </Link>
            <Link to="/terms/privacy">
              <Text $fontType="Body04" color="white">
                개인정보처리방침
              </Text>
            </Link>
          </LinkContainer>
          <InfoContainer>
            <LeftInfo>
              <TopTextContainer>
                {infoData.map((info, index) => (
                  <InfoText $fontType="Caption02" key={index}>
                    {info}
                  </InfoText>
                ))}
              </TopTextContainer>
              {additionalInfoData.map((info, index) => (
                <InfoText $fontType="Caption02" key={index}>
                  {info}
                </InfoText>
              ))}
              <CopyText $fontType="Caption02" color="white">
                copyright (c) www.kico.co.kr all rights reserved.
              </CopyText>
            </LeftInfo>
            <RightInfo>
              <Text $fontType="Body04" color="white">
                대표전화
              </Text>
              <div>
                <Text $fontType="Body03" color="white">
                  02-708-6700
                </Text>
                <Text $fontType="Body05" color="white">
                  (상담시간 AM 9:00 - PM 6:00)
                </Text>
              </div>
            </RightInfo>
          </InfoContainer>
        </FooterContainer>
      </ContentsLayout>
    </ContentsLayout>
  );
};

export default Footer;

export const FooterContainer = styled.div`
   @media screen and (min-width: 768px) {
    padding: 34px 0px 80px 0px;
  }
  @media screen and (min-width: 480px) and (max-width: 767px) {
    padding: 36px 0px 56px 0px;
  }
  @media screen and (max-width: 479px) {
    padding: 36px 0px 52px 0px;
  }
`;

const LinkContainer = styled.div`
  display: flex;
  gap: 0px 16px;

   @media screen and (min-width: 768px) {
    margin-bottom: 54px;
  }
  @media screen and (min-width: 480px) and (max-width: 767px) {
    margin-bottom: 47px;
  }
  @media screen and (max-width: 479px) {
    margin-bottom: 26px;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 479px) {
    flex-direction: column-reverse;
    gap: 30px 0px;
  }
`;

const LeftInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px 0px;
  white-space: nowrap;
`;

const TopTextContainer = styled.div`
  display: flex;
  gap: 0px 17px;
  flex-wrap: wrap;
`;

const InfoText = styled(Text)`
  color: #aeaeae;
  line-height: 22px;
`;

const CopyText = styled(Text)`
  line-height: 22px;
  margin-top: 5px;
`;
