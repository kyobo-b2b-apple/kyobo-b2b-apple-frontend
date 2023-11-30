import { FC } from 'react';
import styled from 'styled-components';
import { Text } from '../common';

interface InfoTextBoxProps {
  infoText: string;
}

const InfoTextBox: FC<InfoTextBoxProps> = ({ infoText }) => {
  return (
    <InfoWrapper>
      <Text $fontType="Body05" color="grey10">
        {infoText}
      </Text>
    </InfoWrapper>
  );
};
export default InfoTextBox;

const InfoWrapper = styled.div`
  white-space: pre-wrap;
  border-radius: 5px;
  background: #2e2e2e;

   @media screen and (min-width: 768px) {
    padding: 21px 20px;
    margin-bottom: 15px;
  }
  @media screen and (min-width: 480px) and (max-width: 767px) {
    padding: 21px 20px;
    margin-bottom: 18px;
  }
  @media screen and (max-width: 479px) {
    padding: 18px 10px 17px 10px;
    margin-bottom: 18px;
  }
`;
