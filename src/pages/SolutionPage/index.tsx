import React from 'react';
import styled from 'styled-components';
import {
  img_solution_tablet,
  img_solution_mobile,
  img_banner_desktop,
  img_banner_tablet,
  img_banner_mobile,
  img_footerbanner_desktop,
  img_footerbanner_tablet,
  img_footerbanner_mobile,
} from '../../assets/img/solution';
import { Spacer, MediaLayout } from '../../components/common';
import ContentsLayout from '../../layout/contentsWidthLayout';
import CommonButton, { ButtonType } from '../../components/common/Button';
import Image from '../../components/image/Image';
import { MediumButton01, MediumButton02, SmallButton01 } from '../../styles/buttonStyle';
import { useNavigate } from 'react-router-dom';
import {
  H0Style,
  H2Style,
  H3Style,
  Body03Style,
  Body04Style,
  Caption01Style,
  MobileTextStyle,
} from '../../styles/typographyStyles';
import useMediaPX from '../../hooks/useMediaPX';
import img_solution_desktop from '../../assets/img/solution/img_solution_desktop.svg';

const SolutionPage = () => {
  const topSolutionSpace = useMediaPX({ desktop: '9px', tablet: '9px', mobile: '6px' });
  const bottomSolutionSpace = useMediaPX({ desktop: '9px', tablet: '9px', mobile: '2px' });
  const bottomBannerSpace = useMediaPX({ desktop: '9px', tablet: '7px', mobile: '10px' });

  const navigate = useNavigate();
  const handleInquiryClick = () => {
    navigate('/inquiry');
  };

  return (
    <ContentsLayout $type="full">
      <ImgWrapper>
        <MediaLayout
          DesktopComponent={<Image src={img_banner_desktop} alt="top-banner" />}
          TabletComponent={<Image src={img_banner_tablet} alt="top-banner" />}
          MobileComponent={<Image src={img_banner_mobile} alt="top-banner" />}
        />
        <TextWrapper>
          <SolutionText>Solution</SolutionText>
          <Spacer height={topSolutionSpace} />
          <TopBannerText>
            Apple Business Manager는
            <br />
            Apple 기기 배포 및 관리를 훨씬 더 간편하게 해줍니다.
          </TopBannerText>
        </TextWrapper>
      </ImgWrapper>

      <MediaLayout
        DesktopComponent={<Image src={img_solution_desktop} alt="solution-image" />}
        TabletComponent={<Image src={img_solution_tablet} alt="solution-image" />}
        MobileComponent={<Image src={img_solution_mobile} alt="solution-image" />}
      />

      <ImgWrapper>
        <MediaLayout
          DesktopComponent={<Image src={img_footerbanner_desktop} alt="bottom-banner" />}
          TabletComponent={<Image src={img_footerbanner_tablet} alt="bottom-banner" />}
          MobileComponent={<Image src={img_footerbanner_mobile} alt="bottom-banner" />}
        />
        <TextWrapper>
          <SolutionText>Support</SolutionText>
          <Spacer height={bottomSolutionSpace} />
          <BottomBannerText>
            기업문의에 관한
            <br />
            지원이 필요하신가요?
          </BottomBannerText>
          <Spacer height={bottomBannerSpace} />
          <SolutionButton padding={0} type={ButtonType.Primary} onClick={handleInquiryClick}>
            기업문의
          </SolutionButton>
        </TextWrapper>
      </ImgWrapper>
    </ContentsLayout>
  );
};
export default SolutionPage;

const ImgWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const TextWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SolutionText = styled.p`
  color: ${(props) => props.theme.color.white};

  @media screen and (min-width: 768px) {
    ${Body04Style}
    letter-spacing: -0.7px;
  }
  @media screen and (max-width: 479px) {
    ${Caption01Style}
  }
`;

const TopBannerText = styled.p`
  color: ${(props) => props.theme.color.white};
  text-align: center;

  @media screen and (min-width: 768px) {
    ${H0Style}
    letter-spacing: -1.08px;
  }
  @media screen and (max-width: 479px) {
    ${H3Style}
    ${MobileTextStyle}
  }
`;

const BottomBannerText = styled.p`
  color: ${(props) => props.theme.color.white};
  text-align: center;

  @media screen and (min-width: 768px) {
    ${H0Style}
    letter-spacing: -1.08px;
  }
  @media screen and (max-width: 767px) {
    ${H2Style}
  }
  @media screen and (max-width: 479px) {
    ${Body03Style}
    ${MobileTextStyle}
  }
`;

const SolutionButton = styled(CommonButton)`
  color: white;
  @media screen and (min-width: 768px) {
    ${MediumButton01}
  }
  @media screen and (max-width: 767px) {
    ${MediumButton02}
  }
  @media screen and (max-width: 479px) {
    ${SmallButton01}
  }
`;
