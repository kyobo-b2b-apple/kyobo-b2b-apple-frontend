import styled from 'styled-components';
import ProductDetailMain from '../../components/productDetail/ProductDetailMain';
import { Spacer } from '../../components/common';

const ProductDetailPage = () => {
  return (
    <DetailPageContainer>
      <Spacer height="54px" />
      <ProductDetailMain />
    </DetailPageContainer>
  );
};

const DetailPageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default ProductDetailPage;
