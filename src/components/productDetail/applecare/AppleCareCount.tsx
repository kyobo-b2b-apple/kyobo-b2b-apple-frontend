/* eslint-disable react/no-unescaped-entities */
import { css, styled } from 'styled-components';
import { Spacer, Text } from '../../common';
import React from 'react';
import InfoText from '../TextStyle';
import PlusBtn from '../../../assets/Icons/PlusBtn.svg';
import MinusBtn from '../../../assets/Icons/MinusBtn.svg';

interface AppleCareCountProps {
  counts: { [key: string]: number };
  handlePlus: (item: string) => void;
  handleMinus: (item: string) => void;
  productData?: any;
  selectedOptions?: any[];
}

const AppleCareCount: React.FC<AppleCareCountProps> = ({
  counts,
  handlePlus,
  handleMinus,
  productData,
  selectedOptions,
}) => {
  const productPrice = productData.result.price;
  const productTotalPrice = productPrice * (counts['product'] || 0);
  return (
    <>
      <SelectProductwrap>
        <InfoText>{productData.result.description}</InfoText>
        <CountWrap>
          <BtnWrap>
            <MinusButton onClick={() => handleMinus('product')} />
            <Text $fontType="Body04" color="white">
              {counts['product'] || 0}
            </Text>
            <PlusButton onClick={() => handlePlus('product')} />
          </BtnWrap>
          <Text $fontType="H3" color="white">
            {productTotalPrice.toLocaleString()} 원
          </Text>
        </CountWrap>
      </SelectProductwrap>

      {selectedOptions &&
        selectedOptions.map((option) => {
          const optionPrice = option.price * (counts[option.value] || 0);
          return (
            <SelectProductwrap key={option.value}>
              <InfoText>{option.label}</InfoText>
              <CountWrap>
                <BtnWrap>
                  <MinusButton onClick={() => handleMinus(option.value)} />
                  <Text $fontType="Body04" color="white">
                    {counts[option.value] || 0}
                  </Text>
                  <PlusButton onClick={() => handlePlus(option.value)} />
                </BtnWrap>
                <Text $fontType="H3" color="white">
                  {optionPrice.toLocaleString()} 원
                </Text>
              </CountWrap>
            </SelectProductwrap>
          );
        })}
      <Spacer height={'23px'} />
      <TotalPrice>
        <InfoText>총 주문금액</InfoText>
        <Text $fontType="H3" color="white">
          {(
            productTotalPrice +
            (selectedOptions
              ? selectedOptions.reduce((sum, option) => sum + (counts[option.value] || 0) * option.price, 0)
              : 0)
          ).toLocaleString()}{' '}
          원
        </Text>
      </TotalPrice>
    </>
  );
};

const SelectProductwrap = styled.div`
  background-color: ${(props) => props.theme.color.grey70};
  padding: 17px 15px 16px 14px;
  display: flex;
  flex-direction: column;
  border-radius: 9px;
  gap: 16px;
  margin-bottom: 10px;
`;

const CountWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;
const BtnWrap = styled.div`
  display: flex;
  gap: 22px;
`;

const ButtonStyle = css`
  background-color: ${(props) => props.theme.color.grey70};
  width: 24px;
  height: 24px;
`;
const MinusButton = styled.button`
  ${ButtonStyle}
  background-image: url(${MinusBtn});
`;
const PlusButton = styled.button`
  ${ButtonStyle}
  background-image: url(${PlusBtn});
`;
const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default AppleCareCount;
