import styled from 'styled-components';
import InquiryInfo from './CompanyInquiryInfo';
import InquiryForm from './CompanyInquiryForm';
import { Spacer } from '../common';

const CompanyInquiry = () => {
  return (
    <CompnayInquiryContainer>
      <InquiryInfo />
      <InquiryForm />
      <Spacer height={'148px'} />
    </CompnayInquiryContainer>
  );
};

const CompnayInquiryContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
`;

export default CompanyInquiry;
