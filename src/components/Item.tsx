import styled from 'styled-components';
import { Text } from './common';
import { OS, useIsOS } from '../hooks/useIsOS';
import Image from './image/Image';
import ItemProps from '../interfaces/itemProps';
import { formatNumber } from '../utils/formatNumber';
import { useNavigate } from 'react-router-dom';
import useMediaFont from '../hooks/useMediaFont';

const Item = ({ id, thumbnails, description, price }: ItemProps) => {
  const isMobile = useIsOS(OS.MOBILE);
  const descFont = useMediaFont({ desktop: 'Body01', tablet: 'Body01', mobile: 'Body04' });
  const priceFont = useMediaFont({ desktop: 'H2', tablet: 'H2', mobile: 'H3' });
  const navigate = useNavigate();
  const handleItemClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <ItemContainer onClick={handleItemClick}>
      <ImgContainer>
        <Image src={thumbnails ? thumbnails[0] : 'default-image-url'} alt="product-image" />
      </ImgContainer>
      <TextContainer>
        <Text $fontType={descFont} color="white">
          {description}
        </Text>
        <PriceContainer isMobile={isMobile}>
          <Text $fontType={priceFont} color="white">
            {formatNumber(price)}원
          </Text>
        </PriceContainer>
      </TextContainer>
    </ItemContainer>
  );
};

export default Item;

const ItemContainer = styled.div`
  @media screen and (min-width: 768px) {
    flex: 0 0 calc((100% - 2 * 20px) / 3);
  }
  @media screen and (max-width: 767px) {
    flex: 0 0 calc((100% - 2 * 17px) / 3);
  }
  @media screen and (max-width: 479px) {
    flex: 0 0 calc((100% - 2 * 9px) / 2);
  }
  cursor: pointer;
`;

const ImgContainer = styled.div`
  width: 100%;
  border-radius: 13px;
  overflow: hidden;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 768px) {
    padding: 22px 12px;
    gap: 8px 0px;
  }
  @media screen and (max-width: 767px) {
    padding: 16px 10px;
    gap: 10px 0px;
  }
  @media screen and (max-width: 479px) {
    padding: 10px 8px;
    gap: 5px 0px;
  }
`;

const PriceContainer = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex-wrap: wrap;
  gap: 2px 9px;
  flex-direction: ${(props) => props.isMobile && 'column-reverse'};
  align-items: ${(props) => !props.isMobile && 'center'};
`;
