import styled from 'styled-components';
import Text from '../common/Text';

import CompnayInquiryPage1 from '../../assets/CompanyInquiryImg/CompanyInquiryPage1.png';
import CompnayInquiryPage2 from '../../assets/CompanyInquiryImg/CompanyInquiryPage2.png';
import CompnayInquiryPage3 from '../../assets/CompanyInquiryImg/CompanyInquiryPage3.png';
import CompnayInquiryPage4 from '../../assets/CompanyInquiryImg/CompanyInquiryPage4.png';
import CompnayInquiryPage5 from '../../assets/CompanyInquiryImg/CompanyInquiryPage5.png';
import CompnayInquiryPage6 from '../../assets/CompanyInquiryImg/CompnayInquiryPage6.png';
import CompnayInquiryPage7 from '../../assets/CompanyInquiryImg/CompnayInquiryPage7.png';

import CompanyInquiryImg from '../../assets/CompanyInquiryImg/img_coporateqna_desktop.svg';
import Image from '../image/Image';

interface ImageData {
  src: string;
  height: number;
}

const ImagesData: ImageData[] = [
  { src: CompnayInquiryPage2, height: 641 },
  { src: CompnayInquiryPage3, height: 641 },
  { src: CompnayInquiryPage4, height: 641 },
  { src: CompnayInquiryPage5, height: 347 },
  { src: CompnayInquiryPage6, height: 474 },
  { src: CompnayInquiryPage7, height: 641 },
];

const InquiryInfo = () => {
  return (
    <InquiryInfoContainer>
      <div>
        <InfoFirst>
          <StyledText $fontType="Body04" color="white">
            기업문의
          </StyledText>
          <SubTitle>
            <StyledText $fontType="H0" color="white">
              기업용 구매,
              <br /> Apple Business Mall이
              <br /> 서포트 해드립니다.
            </StyledText>
          </SubTitle>
        </InfoFirst>
      </div>
      <Spacer />
      <Image src={CompanyInquiryImg} alt="기업문의 이미지" />

      {/* {ImagesData.map((image: ImageData, index: number) => (
        <InfoImg key={index} src={image.src} alt="Company Inquiry" height={image.height} />
      ))} */}
    </InquiryInfoContainer>
  );
};

const Spacer = styled.div`
  background-color: ${(props) => props.theme.color.grey20};
  height: 77px;
  border: 0;
`;

const InquiryInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.color.white};
  width: 100%;

  @media (max-width: 1200px) {
    max-width: 100%;
  }
`;

const InfoFirst = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 313px;
  background-image: url(${CompnayInquiryPage1});

  gap: 9px;
`;
const StyledText = styled(Text)`
  line-height: normal;
`;
const SubTitle = styled.div`
  text-align: center;
  white-space: pre-line;
`;
const InfoImg = styled.img<{ height: number }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default InquiryInfo;
