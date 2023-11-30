import styled from 'styled-components';
import ProductDetail1 from '../../../assets/img/productDetail/productDetail1.png';
import ProductDetail2 from '../../../assets/img/productDetail/productDetail2.png';
import ProductDetail3 from '../../../assets/img/productDetail/productDetail3.png';

interface ImageData {
  src: string;
}

const ImagesData: ImageData[] = [{ src: ProductDetail1 }, { src: ProductDetail2 }, { src: ProductDetail3 }];

const ProductDetailImg = () => {
  return (
    <ProductImgWrap>
      {ImagesData.map((image: ImageData, index: number) => (
        <ProductImg key={index} src={image.src} alt="productImg" />
      ))}
    </ProductImgWrap>
  );
};

const ProductImgWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductImg = styled.img`
  object-fit: cover;
`;

export default ProductDetailImg;
