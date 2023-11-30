import styled from 'styled-components';
import DetailMainImg from './productInfo/DetailMainImg';
import ProductInfo from './productInfo/ProductInfo';
import DetailMainImgResponse from './productInfo/productDetailImgResponse';
import { useDeviceType } from '../../hooks/useIsOS';

interface HeadContainerProps {
  flexDirection: string;
  productId?: string;
}

const ProductDetailHead = ({ productData, productId }) => {
  const { isDesktop, isTablet, isMobile } = useDeviceType();

  return (
    <HeadContainer flexDirection={isDesktop ? 'row' : 'column'}>
      {isTablet || isMobile ? (
        <DetailMainImgResponse productData={productData} isTablet={isTablet} isMobile={isMobile} />
      ) : (
        <DetailMainImg productData={productData} />
      )}
      <ProductInfo productId={productId} productData={productData} />
    </HeadContainer>
  );
};

const HeadContainer = styled.div<HeadContainerProps>`
  display: flex;
  gap: 39px;
  flex-direction: ${(props) => props.flexDirection};
`;

export default ProductDetailHead;
