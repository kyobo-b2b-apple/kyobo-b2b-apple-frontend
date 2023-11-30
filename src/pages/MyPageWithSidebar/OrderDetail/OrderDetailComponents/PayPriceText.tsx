import styled from 'styled-components';
import { Text } from '../../../../components/common';
import useMediaFont from '../../../../hooks/useMediaFont';
import { formatNumber } from '../../../../utils/formatNumber';

interface PayPriceProps {
  label: string;
  value?: number;
  text?: string;
  isFinal?: boolean;
}

const PayPriceText = ({ label, value, text, isFinal = false }: PayPriceProps) => {
  const labelFont = isFinal ? 'Body01' : 'Body04';
  const finalPriceFont = useMediaFont({ desktop: 'H2', tablet: 'H2', mobile: 'H3' });
  const valueFont = isFinal ? finalPriceFont : 'Body05';

  return (
    <PayPriceWrapper>
      <Text $fontType={labelFont} color="white">
        {label}
      </Text>
      <Text $fontType={valueFont} color="white">
        {label === '쿠폰할인' && '-'}
        {value && formatNumber(value) + '원'}
        {text}
      </Text>
    </PayPriceWrapper>
  );
};
export default PayPriceText;

const PayPriceWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (min-width: 480px)  {
    &:not(:last-child) {
      margin-bottom: 18px;
    }
    &: nth-last-child(2) {
      margin-bottom: 24px;
    }
  }

  @media screen and (max-width: 479px) {
    &:not(:last-child) {
      margin-bottom: 12px;
    }
    &: nth-last-child(2) {
      margin-bottom: 28px;
    }
  }
`;
