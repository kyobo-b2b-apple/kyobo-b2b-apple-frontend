/* eslint-disable react/no-unescaped-entities */
import styled from 'styled-components';
import Text from '../../common/Text';
import { Spacer } from '../../common';
import DetailOptionSelect from './DetailOptionSelect';
import InfoText from '../TextStyle';
import AppleCareForm from '../applecare/AppleCareForm';
import ProductBuyBtn from './ProductBuyBtn';
import { OS, useIsOS } from '../../../hooks/useIsOS';
import { useState } from 'react';
import { formatNumber } from '../../../utils/formatNumber';

interface ProductInfoContainerProps {
  isDesktop: boolean;
  productId?: string;
}
const ProductInfo = ({ productData, productId }) => {
  const [selectedOptionData, setSelectedOptionData] = useState([]);
  const [counts, setCounts] = useState({ product: 1, option: 1 });
  const [appleCareName, setAppleCareName] = useState('');
  const [appleCareEmail, setAppleCareEmail] = useState('');
  const isDesktop = useIsOS(OS.DESKTOP);

  const handlePlus = (item: string) => {
    setCounts((prevCounts) => ({ ...prevCounts, [item]: (prevCounts[item] || 0) + 1 }));
  };
  const handleMinus = (item: string) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [item]: prevCounts[item] > 0 ? prevCounts[item] - 1 : prevCounts[item],
    }));
  };

  return (
    <ProductInfoContainer isDesktop={isDesktop}>
      <InfoTitle>
        <Text $fontType="Body05" color="grey20">
          {productData.result.smallCategory}
        </Text>
        <Text $fontType="H3" color="white">
          {productData.result.description}
        </Text>
      </InfoTitle>
      <Text $fontType="H2" color="white">
        {formatNumber(productData.result.price)}
      </Text>
      <Spacer height={'18px'} />
      <ContentContainer>
        <DeliveryInfoWrap>
          <InfoText>배송정보</InfoText>
          <DeliveryInfo>
            <InfoText>택배배송 I 배송회사명</InfoText>
            <Text $fontType="Caption02" color="blue10">
              15시까지 주문 시 오늘 배송 출발
            </Text>
          </DeliveryInfo>
        </DeliveryInfoWrap>
      </ContentContainer>
      <ContentContainer>
        <DeliveryPrice>
          <InfoText>배송비</InfoText>
          <InfoText>무료</InfoText>
        </DeliveryPrice>
      </ContentContainer>
      {isDesktop && (
        <>
          <ContentContainer>
            <DetailOptionSelect
              selectedOptions={selectedOptionData}
              setSelectedOptions={setSelectedOptionData as React.Dispatch<React.SetStateAction<any[]>>}
              productData={productData}
              isDesktop={isDesktop}
            />
          </ContentContainer>
          <ContentContainer>
            <AppleCareForm
              counts={counts}
              handlePlus={handlePlus}
              handleMinus={handleMinus}
              selectedOptions={selectedOptionData}
              productData={productData}
              isDesktop={isDesktop}
              appleCareName={appleCareName}
              setAppleCareName={setAppleCareName}
              appleCareEmail={appleCareEmail}
              setAppleCareEmail={setAppleCareEmail}
            />
          </ContentContainer>
          {/* !!TODO 데이터 전달 로직 확인  */}
          <ProductBuyBtn
            // counts={counts}
            productData={productData}
            productId={productId}
            cartOption={selectedOptionData}
            // selectedOptions={selectedOptionData}
            // appleCareName={appleCareName}
            // appleCareEmail={appleCareEmail}
          />
          <Spacer height={'70px'} />
        </>
      )}
    </ProductInfoContainer>
  );
};

const ProductInfoContainer = styled.div<ProductInfoContainerProps>`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.isDesktop ? '478px' : '100%')};
`;
const InfoTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin-bottom: 20px;
`;
const ContentContainer = styled.div`
  border-top: 1px solid #595959;
  display: flex;
  flex-direction: column;
  padding: 16px 0;
`;

const DeliveryInfoWrap = styled.div`
  display: flex;
  gap: 85.87px;
`;
const DeliveryInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const DeliveryPrice = styled.div`
  display: flex;
  height: 56px;
  align-items: center;
  gap: 98.88px;
`;

export default ProductInfo;
