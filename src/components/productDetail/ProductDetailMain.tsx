import styled from 'styled-components';
import ProductDetailHead from './ProductDetailHead';
import ProductDetailImg from './productDetailImg/ProductDetailImg';
import EtcInfo from './EtcInfo';
import Review from './postReview/Review';
import ProductInquiryMain from './productInquiry/ProductInquiryMain';
import PageCategory from './productInfo/PageCategory';
import { useDeviceType } from '../../hooks/useIsOS';
import MobileDeviceBtn from './MobileBtn';
import { useEffect, useMemo, useState } from 'react';
import { getProduct } from '../../api/ProductApi';
import { useParams } from 'react-router';

interface ContainerProps {
  maxWidth: string;
}
interface Product {
  id: string;
  name: string;
  price: number;
  result: Array<string | number>;
}

const ProductDetailMain = () => {
  const { isDesktop, isTablet, isMobile } = useDeviceType();
  const [productData, setProductData] = useState<Product | null>(null);
  const { productId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const data: Product = await getProduct(productId);
      setProductData(data);
    };
    fetchData();
  }, [productId]);

  const containerWidth = useMemo(() => {
    if (isTablet) {
      return '599px';
    } else if (isMobile) {
      return '320px';
    }
    return '868px';
  }, [isMobile, isTablet]);
  if (!productData) {
    return null;
  }

  return (
    <ProductDetailContainer>
      <MainContainer maxWidth={containerWidth}>
        <ProductDetailHead productId={productId} productData={productData} />
        <PageCategory isMobileType={isMobile} />
      </MainContainer>
      <Underline />
      <MainContainer maxWidth={containerWidth}>
        <ProductDetailImg />
        <EtcInfo />
        <Review productId={productId} />
        <ProductInquiryMain productId={productId} />
        {!isDesktop && (
          <MobileDeviceBtn productData={productData} isMobileDevice={isMobile || isTablet} isMobile={isMobile} />
        )}
      </MainContainer>
    </ProductDetailContainer>
  );
};
const ProductDetailContainer = styled.div`
  position: relative;
`;

const MainContainer = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  max-width: ${(props) => props.maxWidth};
  margin: 0 auto;
`;
const Underline = styled.div`
  border: 1px solid #545454;
  width: 100%;
`;

export default ProductDetailMain;
