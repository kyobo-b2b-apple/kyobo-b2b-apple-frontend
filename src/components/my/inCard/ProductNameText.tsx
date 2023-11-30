import { FC } from 'react';
import styled from 'styled-components';
import { Text } from '../../common';
import useMediaFont from '../../../hooks/useMediaFont';

interface ProductNameProps {
  productName: string;
}

const ProductNameText: FC<ProductNameProps> = ({ productName }) => {
  const fontType = useMediaFont({ desktop: 'H3', tablet: 'H3', mobile: 'Body03' });
  return (
    <NameWrapper>
      <Text $fontType={fontType} color="white">
        {productName}
      </Text>
    </NameWrapper>
  );
};
export default ProductNameText;

const NameWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
