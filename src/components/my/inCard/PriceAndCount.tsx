import { FC } from 'react';
import styled from 'styled-components';
import { Text } from '../../common';
import useMediaFont from '../../../hooks/useMediaFont';
import { formatNumber } from '../../../utils/formatNumber';

interface PriceProps {
  price: number;
  count: number;
}

const PriceAndCount: FC<PriceProps> = ({ price, count }) => {
  const fontType = useMediaFont({ desktop: 'Body04', tablet: 'Body04', mobile: 'Caption02' });

  return (
    <PriceWrapper>
      <Text $fontType={fontType} color="white">
        {formatNumber(price)}원
      </Text>
      <Text $fontType={fontType} color="white">
        {count}개
      </Text>
    </PriceWrapper>
  );
};
export default PriceAndCount;

const PriceWrapper = styled.div`
  display: flex;
  gap: 9px;
`;
