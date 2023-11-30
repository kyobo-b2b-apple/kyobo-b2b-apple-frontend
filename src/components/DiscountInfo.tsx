import { FC } from 'react';
import styled from 'styled-components';
import { Text, Spacer } from './common';
import { formatNumber } from '../utils/formatNumber';

interface ItemPriceProps {
  price: number;
  dcratio?: number;
}

const DiscountInfo: FC<ItemPriceProps> = ({ price, dcratio }) => {
  if (!dcratio) {
    return null;
  }
  return (
    <DiscountWrapper>
      <DiscountedPrice $fontType="Body05" color="grey40">
        {formatNumber(price)}원
      </DiscountedPrice>
      <Spacer width="7px" />
      <Text $fontType="Body05" color="blue10">
        {dcratio}%
      </Text>
    </DiscountWrapper>
  );
};
export default DiscountInfo;

const DiscountedPrice = styled(Text)`
  text-decoration: line-through;
`;

const DiscountWrapper = styled.div`
  display: flex;
`;
