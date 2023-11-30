import styled from 'styled-components';
import { Text } from '../../../../components/common';
import { formatPhoneNumber } from '../../../../utils/formatPhoneNumber';

interface InfoTextProps {
  name: string;
  phone: string;
  address: string;
  addressDetail: string;
}

const DeliveryInfoTexts = ({ name, phone, address, addressDetail }: InfoTextProps) => {
  return (
    <InfoTextWrapper>
      <Text $fontType="Body03" color="white">
        {name} (기본 배송지)
      </Text>
      <Text $fontType="Body05" color="white">
        {formatPhoneNumber(phone)}
      </Text>
      <Text $fontType="Body05" color="white">
        ({addressDetail}) {address}
      </Text>
    </InfoTextWrapper>
  );
};
export default DeliveryInfoTexts;

const InfoTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px 0px;
`;
