import styled from 'styled-components';
import { TermsProps } from '../../constants/terms';
import { Text, Spacer } from '../../components/common';

const TermsContainer = ({ title, content }: TermsProps) => {
  return (
    <TermsWrapper>
      <Text $fontType="Caption03" color="white" lineHeight="22px">
        {title}
      </Text>
      <Spacer height="20px" />
      <Text $fontType="Caption02" color="white" lineHeight="22px">
        {content}
      </Text>
      <Spacer height="25px" />
    </TermsWrapper>
  );
};
export default TermsContainer;

const TermsWrapper = styled.div`
  white-space: pre-wrap;
`;
