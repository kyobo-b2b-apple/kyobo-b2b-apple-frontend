import React from 'react';
import styled from 'styled-components';
import Text from '../components/common/Text';
import Item from './Item';
import { Spacer } from './common';
import useMediaFont from '../hooks/useMediaFont';
import useMediaPX from '../hooks/useMediaPX';
import ItemProps from '../interfaces/itemProps';

interface LabelProps {
  type?: string;
  label?: string;
  items: ItemProps[];
}

const ItemList: React.FC<LabelProps> = ({ type, label, items }) => {
  const landingFontType = useMediaFont({ desktop: 'H0', tablet: 'H0', mobile: 'H3' });
  const landingSpacer = useMediaPX({ desktop: '24px', tablet: '19px', mobile: '8px' });
  const landingGap = useMediaPX({ desktop: '30px', tablet: '30px', mobile: '20px' });
  const categoryFontType = useMediaFont({ desktop: 'H2', tablet: 'H3', mobile: 'Body03' });
  const categorySpacer = useMediaPX({ desktop: '16px', tablet: '16px', mobile: '14px' });
  const categoryGap = useMediaPX({ desktop: '32px', tablet: '30px', mobile: '14px' });

  const fontType = type === 'landing' ? landingFontType : categoryFontType;
  const spacerHeight = type === 'landing' ? landingSpacer : categorySpacer;
  const gap = type === 'landing' ? landingGap : categoryGap;

  return (
    <ItemRecommendContainer>
      {label && (
        <>
          <Text color="white" $fontType={fontType}>
            {label}
          </Text>
          <Spacer height={spacerHeight} />
        </>
      )}
      <ItemsListContainer gap={gap}>
        {items.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </ItemsListContainer>
    </ItemRecommendContainer>
  );
};

export default ItemList;

const ItemRecommendContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ItemsListContainer = styled.div<{ gap: string | number }>`
  display: flex;
  flex-wrap: wrap;
   @media screen and (min-width: 768px) {
    gap: ${(props) => props.gap} 20px;
  }
  @media screen and (min-width: 480px) and (max-width: 767px) {
    gap: ${(props) => props.gap} 17px;
  }
  @media screen and (max-width: 479px) {
    gap: ${(props) => props.gap} 9px;
    
  }
`;
